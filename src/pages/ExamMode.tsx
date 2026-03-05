import { useState, useEffect, useMemo } from "react";
import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { useStudy, type StudyQuiz, type QuizQuestion } from "@/context/StudyContext";
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
  Brain,
  Loader2,
  Repeat2,
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

// Spaced repetition: questions answered wrong come back with double frequency
function buildSpacedQueue(questions: QuizQuestion[]): number[] {
  return questions.map((_, i) => i);
}

export default function ExamMode() {
  const { extractedText, quiz, setQuiz, pdfName } = useStudy();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Spaced repetition state
  const [queue, setQueue] = useState<number[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [wrongIndices, setWrongIndices] = useState<Set<number>>(new Set());
  const [repeatMode, setRepeatMode] = useState(false);

  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [history, setHistory] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    setHistory(getExamHistory());
  }, []);

  // Reset queue when quiz changes
  useEffect(() => {
    if (quiz) {
      setQueue(buildSpacedQueue(quiz.questions));
      setQueueIndex(0);
      setWrongIndices(new Set());
      setRepeatMode(false);
      setScore(0);
      setSelected(null);
    }
  }, [quiz]);

  const currentQ = useMemo(() => queue[queueIndex] ?? 0, [queue, queueIndex]);
  const isComplete = queue.length > 0 && queueIndex >= queue.length && !showFeedback;

  const onGenerate = async () => {
    if (!extractedText) return;
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const result = await nodoiaAi<StudyQuiz>({ mode: "quiz", text: extractedText });
      setQuiz(result);
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
    if (selected !== null || !quiz) return;
    setSelected(idx);

    const q = quiz.questions[currentQ];
    const isCorrect = idx === q.correctIndex;

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      // Mark for spaced repetition — add to wrong set
      setWrongIndices((prev) => new Set(prev).add(currentQ));
    }
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    const nextIdx = queueIndex + 1;

    if (nextIdx >= queue.length) {
      // First pass done — check if there are wrong answers to repeat
      if (!repeatMode && wrongIndices.size > 0) {
        // Build a repeat queue of wrong questions, shuffled
        const repeatQueue = Array.from(wrongIndices).sort(() => Math.random() - 0.5);
        setQueue(repeatQueue);
        setQueueIndex(0);
        setRepeatMode(true);
        setSelected(null);
        return;
      }
      // All done
      const attempt = saveExamAttempt({
        score,
        total: quiz!.questions.length,
        pdfName: pdfName || "Sin nombre",
      });
      setHistory((h) => [attempt, ...h]);
      setQueueIndex(nextIdx);
    } else {
      setQueueIndex(nextIdx);
      setSelected(null);
    }
  };

  const restart = () => {
    setSelected(null);
    setScore(0);
    setQueue([]);
    setQueueIndex(0);
    setWrongIndices(new Set());
    setRepeatMode(false);
    setQuiz(null);
  };

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
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generando preguntas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generar examen
                    </>
                  )}
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
            {/* Spaced repetition banner */}
            {repeatMode && (
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2 text-xs">
                <Repeat2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-foreground/80">
                  <strong>Repaso inteligente:</strong> Estas son las preguntas que fallaste. ¡A por ellas!
                </span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Progress
                value={((queueIndex + 1) / queue.length) * 100}
                className="h-2 flex-1"
              />
              <span className="text-sm text-muted-foreground">
                {queueIndex + 1}/{queue.length}
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
                            ? "border-success bg-success/10"
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
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
                  <CheckCircle2 className="h-7 w-7 text-success" />
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
