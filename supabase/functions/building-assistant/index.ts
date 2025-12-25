import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from "https://esm.sh/@huggingface/inference@2.3.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, products } = await req.json();
    const HF_TOKEN = Deno.env.get("HUGGING_FACE_ACCESS_TOKEN");
    
    if (!HF_TOKEN) {
      throw new Error("HUGGING_FACE_ACCESS_TOKEN is not configured");
    }

    const hf = new HfInference(HF_TOKEN);

    const systemPrompt = `أنت مساعد أبعاد للذكاء الاصطناعي، متخصص في مساعدة العملاء على اختيار الأشكال السداسية ثلاثية الأبعاد المناسبة لمشاريع البناء والتصميم. يجب أن تجيب دائماً باللغة العربية.

المنتجات المتاحة:
${products.map((p: any) => `
📦 ${p.name}
- الأبعاد: ${p.dimensions}
- اللون: ${p.color}
- السعر: ${p.price} ريال سعودي
- الصورة: ${p.image}
`).join('\n')}

مهمتك هي:
1. السؤال عن مشروعهم (حجم المساحة، الغرض، الأهداف الجمالية)
2. حساب عدد القطع المطلوبة بناءً على المساحة والأبعاد
3. التوصية بمنتجات وكميات محددة بناءً على احتياجاتهم
4. عرض تفاصيل كل منتج موصى به (الاسم، الأبعاد، اللون، السعر)
5. تقديم اقتراحات ترتيب إبداعية
6. حساب التكاليف الإجمالية

عند التوصية بمنتج، اعرض جميع التفاصيل بشكل واضح ومنظم.
كن مفيداً ومبدعاً ومتحمساً للتصميم الهندسي. اجعل الردود موجزة ولكن غنية بالمعلومات.`;

    // Build the conversation for ALLAM
    const conversationHistory = messages.map((m: any) => 
      `${m.role === 'user' ? 'المستخدم' : 'المساعد'}: ${m.content}`
    ).join('\n');

    const fullPrompt = `${systemPrompt}\n\nالمحادثة:\n${conversationHistory}\n\nالمساعد:`;

    // Use ALLAM model from Hugging Face
    const response = await hf.textGeneration({
      model: "ALLaM-AI/ALLaM-7B-Instruct-preview",
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    const generatedText = response.generated_text || "";

    // Return as SSE format for compatibility with existing frontend
    const sseData = `data: ${JSON.stringify({
      choices: [{ delta: { content: generatedText } }]
    })}\n\ndata: [DONE]\n\n`;

    return new Response(sseData, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Building assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});