import { toast } from "sonner";

export type AiMode = "summary" | "quiz";

export class NodoIaApiError extends Error {
  status: number;
  retryAfterSeconds?: number;
  constructor(message: string, status: number, retryAfterSeconds?: number) {
    super(message);
    this.name = "NodoIaApiError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export async function nodoiaAi<T>(args: { mode: AiMode; text: string }): Promise<T> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nodoia-ai`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(args),
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    const retryAfterHeader = resp.headers.get("retry-after");
    const retryAfterSeconds =
      typeof (body as any)?.retry_after_seconds === "number"
        ? (body as any).retry_after_seconds
        : retryAfterHeader
          ? Number(retryAfterHeader)
          : undefined;

    const baseMsg = (body as any)?.error || "No se pudo completar la solicitud.";
    const msg =
      resp.status === 429 && retryAfterSeconds
        ? `${baseMsg} (Intenta de nuevo en ~${retryAfterSeconds}s)`
        : baseMsg;

    toast.error(msg);
    throw new NodoIaApiError(msg, resp.status, retryAfterSeconds);
  }

  const data = (await resp.json()) as { result: T };
  return data.result;
}
