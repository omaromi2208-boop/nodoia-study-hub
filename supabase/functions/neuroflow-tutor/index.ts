import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, context } = (await req.json().catch(() => ({}))) as {
      question?: string;
      context?: string;
    };

    if (!question?.trim()) {
      return json(400, { error: "Falta la pregunta." });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return json(500, { error: "Backend no configurado." });
    }

    const systemPrompt = context?.trim()
      ? `Eres un tutor de estudio experto. Responde ÚNICAMENTE basándote en el siguiente documento. 
Si la pregunta no puede responderse con el documento, di "No encuentro esa información en el documento."
Sé conciso, claro y pedagógico. Usa ejemplos del texto cuando sea posible.

DOCUMENTO:
${context.slice(0, 30000)}`
      : `Eres un tutor de estudio experto. El usuario aún no ha cargado un documento.
Invítale amablemente a cargar un PDF para poder ayudarle con preguntas específicas.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: 0.3,
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return json(429, { error: "Demasiadas solicitudes. Espera un momento." });
      }
      if (response.status === 402) {
        return json(402, { error: "Créditos insuficientes." });
      }
      return json(502, { error: "Error del servicio de IA." });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "No pude generar una respuesta.";

    return json(200, { answer });
  } catch (e) {
    console.error("neuroflow-tutor error", e);
    return json(500, { error: "Error inesperado." });
  }
});
