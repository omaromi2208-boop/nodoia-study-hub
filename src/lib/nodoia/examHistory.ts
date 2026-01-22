export type ExamAttempt = {
  id: string;
  createdAt: number;
  score: number;
  total: number;
};

const KEY = "nodoia_exam_history";

export function loadExamHistory(): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ExamAttempt[]) : [];
  } catch {
    return [];
  }
}

export function saveExamAttempt(attempt: ExamAttempt) {
  const all = loadExamHistory();
  all.unshift(attempt);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 20)));
}
