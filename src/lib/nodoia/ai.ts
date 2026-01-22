import { toast } from "sonner";

export type AiMode = "summary" | "quiz";

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
    const msg = (body as any)?.error || "No se pudo completar la solicitud.";
    toast.error(msg);
    throw new Error(msg);
  }

  const data = (await resp.json()) as { result: T };
  return data.result;
}
