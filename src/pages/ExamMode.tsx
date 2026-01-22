import { useMemo, useState } from "react";
import { AppShell } from "@/components/nodoia/AppShell";
import { Button } from "@/components/ui/button";
import { useStudy, type StudyQuiz } from "@/context/StudyContext";
import { nodoiaAi } from "@/lib/nodoia/ai";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function ExamMode() {
  const { extractedText, quiz, setQuiz } = useStudy();
  const [isGenerating, setIsGenerating] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const score = useMemo(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce((acc, q, i) => (answers[i] === q.correctIndex ? acc + 1 : acc), 0);
  }, [answers, quiz]);

  const generate = async () => {
    if (!extractedText) return;
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const result = await nodoiaAi<StudyQuiz>({ mode: "quiz", text: extractedText });
      setQuiz(result);
      setAnswers({});
      setSubmitted(false);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "No se pudo generar el test.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppShell title="Modo Examen">
      <h1 className="text-lg font-semibold">Modo Examen</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Genera 5 preguntas tipo test basadas en tu PDF.
      </p>

      <div className="mt-4 rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {extractedText ? "PDF cargado" : "Sin PDF: ve al Dashboard"}
          </div>
          <Button variant="hero" disabled={!extractedText || isGenerating} onClick={() => void generate()}>
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generando…" : "Generar test"}
          </Button>
        </div>
        {errorMsg ? (
          <div className="mt-3 rounded-xl border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs">
            {errorMsg}
          </div>
        ) : null}
      </div>

      {quiz ? (
        <div className="mt-4 grid gap-3">
          {quiz.questions.map((q, qi) => (
            <article key={qi} className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
              <div className="text-sm font-semibold">{qi + 1}. {q.question}</div>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, oi) => {
                  const checked = answers[qi] === oi;
                  const correct = submitted && oi === q.correctIndex;
                  const wrong = submitted && checked && oi !== q.correctIndex;
                  return (
                    <label
                      key={oi}
                      className={
                        "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 transition-colors " +
                        (correct
                          ? "border-brand/60 bg-brand/10"
                          : wrong
                            ? "border-destructive/50 bg-destructive/10"
                            : "border-border/60 bg-background/20 hover:bg-background/30")
                      }
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        className="mt-1"
                        checked={checked}
                        disabled={submitted}
                        onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                      />
                      <div className="text-sm">{opt}</div>
                    </label>
                  );
                })}
              </div>
              {submitted ? (
                <div className="mt-3 text-xs text-muted-foreground">{q.explanation}</div>
              ) : null}
            </article>
          ))}

          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">
                {submitted ? `Puntuación: ${score}/5` : "Cuando estés listo, envía"}
              </div>
              {!submitted ? (
                <Button variant="glass" onClick={() => setSubmitted(true)}>
                  <CheckCircle2 className="h-4 w-4" /> Enviar
                </Button>
              ) : (
                <Button variant="soft" onClick={() => setSubmitted(false)}>Revisar</Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
