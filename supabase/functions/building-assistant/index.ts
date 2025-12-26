import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "نفدت رصيد الخدمة." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "خطأ في خدمة الذكاء الاصطناعي" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
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