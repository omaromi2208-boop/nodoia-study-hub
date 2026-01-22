import React, { createContext, useContext, useMemo, useState } from "react";

export type SummaryNode = {
  id: string;
  label: string;
  summary: string;
  bullets: string[];
  mnemonic: string;
};

export type SummaryEdge = {
  from: string;
  to: string;
  relation: string;
};

export type StudySummary = {
  title: string;
  overview: string;
  nodes: SummaryNode[];
  edges: SummaryEdge[];
};

export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type StudyQuiz = {
  questions: QuizQuestion[];
};

type StudyState = {
  pdfName: string | null;
  extractedText: string;
  summary: StudySummary | null;
  quiz: StudyQuiz | null;
  setPdf: (args: { name: string; text: string }) => void;
  clear: () => void;
  setSummary: (s: StudySummary | null) => void;
  setQuiz: (q: StudyQuiz | null) => void;
};

const StudyContext = createContext<StudyState | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [quiz, setQuiz] = useState<StudyQuiz | null>(null);

  const value = useMemo<StudyState>(
    () => ({
      pdfName,
      extractedText,
      summary,
      quiz,
      setPdf: ({ name, text }) => {
        setPdfName(name);
        setExtractedText(text);
        setSummary(null);
        setQuiz(null);
      },
      clear: () => {
        setPdfName(null);
        setExtractedText("");
        setSummary(null);
        setQuiz(null);
      },
      setSummary,
      setQuiz,
    }),
    [pdfName, extractedText, summary, quiz],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
}
