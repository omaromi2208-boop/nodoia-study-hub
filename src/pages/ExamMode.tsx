import { useState, useEffect } from "react";
import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { useStudy, type StudyQuiz } from "@/context/StudyContext";
import { nodoiaAi, NodoIaApiError } from "@/lib/nodoia/ai";
import { saveExamAttempt, getExamHistory, type ExamAttempt } from "@/lib/nodoia/examHistory";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  Trophy,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ExamMode() {
  const { extractedText, quiz, setQuiz, pdfName } = useStudy();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [history, setHistory] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    setHistory(getExamHistory());
  }, []);

  const onGenerate = async () => {
    if (!extractedText) return;
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const result = await nodoiaAi<StudyQuiz>({ mode: "quiz", text: extractedText });
      setQuiz(result);
      setCurrentQ(0);
      setSelected(null);
      setScore(0);
      setAnswered([]);
    } catch (e) {
      if (e instanceof NodoIaApiError) {
        setErrorMsg(e.message);
      } else {
        setErrorMsg(e instanceof Error ? e.message : "Error al generar el examen.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const q = quiz!.questions[currentQ];
    const isCorrect = idx === q.correctIndex;

    if (isCorrect) setScore((s) => s + 1);
    setAnswered((a) => [...a, isCorrect]);
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQ + 1 < (quiz?.questions.length || 0)) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    } else {
      const attempt = saveExamAttempt({
        score,
        total: quiz!.questions.length,
        pdfName: pdfName || "Sin nombre",
      });
      setHistory((h) => [attempt, ...h]);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered([]);
    setQuiz(null);
  };

  const isComplete = quiz && currentQ >= quiz.questions.length - 1 && selected !== null && !showFeedback;

  return (
    <AppShell title="Modo Examen">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Modo Examen</h1>
          <p className="text-muted-foreground">
            Pon a prueba tus conocimientos con preguntas generadas por IA
          </p>
        </div>

        {!quiz ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-brand" />
            </div>

            {extractedText ? (
              <>
                <h2 className="text-lg font-semibold">¿Listo para el examen?</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  La IA generará 5 preguntas basadas en tu documento
                </p>
                <Button
                  onClick={() => void onGenerate()}
                  disabled={isGenerating}
                  className="mt-6"
                  variant="hero"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? "Generando preguntas..." : "Generar examen"}
                </Button>
                {errorMsg && (
                  <p className="mt-4 text-sm text-destructive">{errorMsg}</p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">Primero carga un documento</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Sube un PDF para que la IA pueda generar preguntas relevantes
                </p>
                <Button asChild className="mt-6" variant="hero">
                  <Link to="/nuevo-estudio">
                    <Upload className="h-4 w-4" />
                    Subir PDF
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
        ) : isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10 mx-auto mb-4">
              <Trophy className="h-10 w-10 text-brand" />
            </div>
            <h2 className="text-2xl font-bold">¡Examen completado!</h2>
            <p className="text-4xl font-bold text-brand mt-4">
              {score}/{quiz.questions.length}
            </p>
            <p className="text-muted-foreground mt-2">
              {score === quiz.questions.length
                ? "¡Perfecto! Dominas este tema"
                : score >= quiz.questions.length / 2
                  ? "¡Buen trabajo! Sigue practicando"
                  : "Repasa el material y vuelve a intentarlo"}
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={restart} variant="outline">
                <RotateCcw className="h-4 w-4" />
                Nuevo examen
              </Button>
              <Button asChild variant="hero">
                <Link to="/mapa-mental">
                  <Brain className="h-4 w-4" />
                  Repasar mapa
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Progress
                value={((currentQ + 1) / quiz.questions.length) * 100}
                className="h-2 flex-1"
              />
              <span className="text-sm text-muted-foreground">
                {currentQ + 1}/{quiz.questions.length}
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-lg font-medium font-edu">
                {quiz.questions[currentQ].question}
              </p>

              <div className="mt-4 space-y-2">
                {quiz.questions[currentQ].options.map((opt, idx) => {
                  const isCorrect = idx === quiz.questions[currentQ].correctIndex;
                  const isSelected = selected === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all",
                        selected === null
                          ? "border-border hover:border-brand hover:bg-accent cursor-pointer"
                          : isCorrect
                            ? "border-green-500 bg-green-500/10"
                            : isSelected
                              ? "border-destructive bg-destructive/10"
                              : "border-border opacity-50"
                      )}
                    >
                      <span className="text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {history.length > 0 && !quiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <h3 className="font-semibold mb-3">Historial de exámenes</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <span className="truncate flex-1">{attempt.pdfName}</span>
                  <span className="font-medium text-brand">
                    {attempt.score}/{attempt.total}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              {feedbackCorrect ? (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                  <CheckCircle2 className="h-7 w-7 text-green-500" />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
                  <XCircle className="h-7 w-7 text-destructive" />
                </div>
              )}
            </div>
            <DialogTitle className="text-center">
              {feedbackCorrect ? "¡Correcto!" : "No es la respuesta correcta"}
            </DialogTitle>
            <DialogDescription className="text-center font-edu">
              {quiz?.questions[currentQ].explanation}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={nextQuestion} className="w-full" variant="hero">
            {currentQ + 1 < (quiz?.questions.length || 0) ? (
              <>
                Siguiente pregunta
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Ver resultados"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
