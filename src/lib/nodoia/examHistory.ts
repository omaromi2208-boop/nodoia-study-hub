export type ExamAttempt = {
  id: string;
  createdAt: number;
  score: number;
  total: number;
  pdfName: string;
};

const KEY = "neuroflow_exam_history";

export function getExamHistory(): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ExamAttempt[]) : [];
  } catch {
    return [];
  }
}

export function saveExamAttempt(data: Omit<ExamAttempt, "id" | "createdAt">): ExamAttempt {
  const attempt: ExamAttempt = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...data,
  };
  const all = getExamHistory();
  all.unshift(attempt);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 20)));
  return attempt;
}
