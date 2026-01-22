import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Mode = "summary" | "quiz";

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode, text } = (await req.json().catch(() => ({}))) as {
      mode?: Mode;
      text?: string;
    };

    if (mode !== "summary" && mode !== "quiz") {
      return json(400, { error: "Invalid mode. Use 'summary' or 'quiz'." });
    }

    const inputText = typeof text === "string" ? text.trim() : "";
    if (!inputText) return json(400, { error: "Missing text." });

    // Keep payload bounded for reliability.
    const MAX_CHARS = 60_000;
    const boundedText = inputText.length > MAX_CHARS
      ? inputText.slice(0, MAX_CHARS) + "\n\n[TRUNCATED]"
      : inputText;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json(500, { error: "Backend not configured (missing key)." });

    const system =
      "Eres NodoIA, un asistente de estudio profesional. Responde SIEMPRE en español. " +
      "Sé preciso, pedagógico y estructurado. No inventes datos; si falta contexto, dilo.";

    const summaryTool = {
      type: "function",
      function: {
        name: "return_summary",
        description:
          "Return a structured study summary with 7 key nodes and a simple directed map between them.",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string" },
            overview: { type: "string" },
            nodes: {
              type: "array",
              minItems: 7,
              maxItems: 7,
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  label: { type: "string" },
                  summary: { type: "string" },
                  bullets: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 3,
                    maxItems: 6,
                  },
                  mnemonic: { type: "string" },
                },
                required: ["id", "label", "summary", "bullets", "mnemonic"],
                additionalProperties: false,
              },
            },
            edges: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  from: { type: "string" },
                  to: { type: "string" },
                  relation: { type: "string" },
                },
                required: ["from", "to", "relation"],
                additionalProperties: false,
              },
            },
          },
          required: ["title", "overview", "nodes", "edges"],
          additionalProperties: false,
        },
      },
    } as const;

    const quizTool = {
      type: "function",
      function: {
        name: "return_quiz",
        description: "Return 5 multiple-choice questions based on the provided text.",
        parameters: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              minItems: 5,
              maxItems: 5,
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: {
                    type: "array",
                    minItems: 4,
                    maxItems: 4,
                    items: { type: "string" },
                  },
                  correctIndex: { type: "integer", minimum: 0, maximum: 3 },
                  explanation: { type: "string" },
                },
                required: ["question", "options", "correctIndex", "explanation"],
                additionalProperties: false,
              },
            },
          },
          required: ["questions"],
          additionalProperties: false,
        },
      },
    } as const;

    const prompt = mode === "summary"
      ? "Genera un resumen estructurado en 7 nodos clave del texto. " +
        "Cada nodo debe ser útil para estudiar (bullets concretos, conceptos y relaciones). " +
        "Incluye un mapa con relaciones dirigidas (edges) entre nodos."
      : "Genera 5 preguntas tipo test basadas estrictamente en el texto. " +
        "Opciones plausibles, una correcta, y explica brevemente por qué.";

    const tools = mode === "summary" ? [summaryTool] : [quizTool];
    const tool_choice = mode === "summary"
      ? { type: "function", function: { name: "return_summary" } }
      : { type: "function", function: { name: "return_quiz" } };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: mode === "quiz" ? 0.4 : 0.3,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `${prompt}\n\nTEXTO:\n${boundedText}` },
        ],
        tools,
        tool_choice,
      }),
    });

    if (!response.ok) {
      // Surface known gateway errors without throwing (avoid 500 from us).
      if (response.status === 429) {
        return json(429, { error: "Demasiadas solicitudes. Espera un momento y reintenta." });
      }
      if (response.status === 402) {
        return json(402, { error: "Créditos insuficientes para IA. Revisa el uso del workspace." });
      }

      const t = await response.text().catch(() => "");
      console.error("AI gateway error", response.status, t);
      return json(502, { error: "Error del servicio de IA. Reintenta en unos segundos." });
    }

    const data = await response.json().catch(() => null) as any;
    const toolCalls = data?.choices?.[0]?.message?.tool_calls;
    const toolArgsStr = toolCalls?.[0]?.function?.arguments;

    if (!toolArgsStr || typeof toolArgsStr !== "string") {
      console.error("Missing tool arguments", data);
      return json(502, { error: "Respuesta inválida de IA. Reintenta." });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(toolArgsStr);
    } catch (e) {
      console.error("Failed to parse tool args", e, toolArgsStr);
      return json(502, { error: "No se pudo procesar la respuesta de IA. Reintenta." });
    }

    return json(200, { mode, result: parsed });
  } catch (e) {
    console.error("nodoia-ai error", e);
    return json(500, { error: "Error inesperado. Reintenta." });
  }
});
