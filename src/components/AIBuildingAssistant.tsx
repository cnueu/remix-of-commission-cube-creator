import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Snowflake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/building-assistant`;

// Product data from the Excel file (shapesinfo.xlsx)
const products = [
  { 
    id: 'hex-dark-green', 
    name: 'سداسي أخضر داكن', 
    price: 2, 
    dimensions: 'الطول = 5 سم، العرض = 5 سم، الارتفاع = 5 سم',
    color: 'أخضر داكن', 
    image: 'DarkGreen.png'
  },
  { 
    id: 'hex-dark-blue', 
    name: 'سداسي أزرق داكن', 
    price: 3, 
    dimensions: 'الطول = 6 سم، العرض = 6 سم، الارتفاع = 6 سم',
    color: 'أزرق داكن', 
    image: 'DarkBlue.png'
  },
  { 
    id: 'hex-dark-red', 
    name: 'سداسي أحمر داكن', 
    price: 4, 
    dimensions: 'الطول = 7 سم، العرض = 7 سم، الارتفاع = 7 سم',
    color: 'أحمر داكن', 
    image: 'DarkRed.png'
  },
  { 
    id: 'hex-light-green', 
    name: 'سداسي أخضر فاتح', 
    price: 5, 
    dimensions: 'الطول = 8 سم، العرض = 8 سم، الارتفاع = 8 سم',
    color: 'أخضر فاتح', 
    image: 'LightGreen.png'
  },
  { 
    id: 'hex-light-blue', 
    name: 'سداسي أزرق فاتح', 
    price: 6, 
    dimensions: 'الطول = 9 سم، العرض = 9 سم، الارتفاع = 9 سم',
    color: 'أزرق فاتح', 
    image: 'LightBlue.png'
  },
  { 
    id: 'hex-light-red', 
    name: 'سداسي أحمر فاتح', 
    price: 7, 
    dimensions: 'الطول = 10 سم، العرض = 10 سم، الارتفاع = 10 سم',
    color: 'أحمر فاتح', 
    image: 'LightRed.png'
  },
];

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, products }),
  });

  if (!resp.ok) {
    if (resp.status === 429) {
      throw new Error('تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً.');
    }
    if (resp.status === 402) {
      throw new Error('نفدت رصيد الخدمة.');
    }
    throw new Error('فشل الاتصال بالمساعد');
  }

  if (!resp.body) throw new Error('لا يوجد رد');

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);

      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') break;

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }

  onDone();
}

export default function AIBuildingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMessage],
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: error instanceof Error ? error.message : 'فشل في الحصول على الرد',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Snowflake className="text-primary-foreground" size={20} />
              </div>
              <div>
                <h3 className="font-display text-lg text-primary-foreground">مساعد أبعاد</h3>
                <p className="text-xs text-primary-foreground/70">مساعد مشاريع البناء</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Snowflake className="mx-auto mb-4 text-primary" size={40} />
                <p className="font-display text-lg">مرحباً بك في أبعاد!</p>
                <p className="text-sm mt-2">أخبرني عن مشروع البناء الخاص بك وسأساعدك في اختيار الأشكال ثلاثية الأبعاد المثالية.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-bl-sm'
                      : 'bg-muted text-foreground rounded-br-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-end">
                <div className="bg-muted rounded-2xl px-4 py-3 rounded-br-sm">
                  <Loader2 className="animate-spin text-primary" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="صف مشروعك..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-right"
                dir="rtl"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
