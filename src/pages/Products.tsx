import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import AIBuildingAssistant from '@/components/AIBuildingAssistant';

const products = [
  {
    id: 'cube-teal',
    name: 'مكعب فيروزي',
    price: 49,
    shape: 'cube' as const,
    color: '#1f9d8a',
    description: 'مكعب فيروزي مذهل بحواف مثالية وعمق ساحر.'
  },
  {
    id: 'cube-coral',
    name: 'مكعب مرجاني',
    price: 59,
    shape: 'cube' as const,
    color: '#e85a4f',
    description: 'مكعب مرجاني نابض بالحياة يضيف الدفء والطاقة لأي مساحة.'
  },
  {
    id: 'hex-magenta',
    name: 'سداسي أرجواني',
    price: 69,
    shape: 'hexagon' as const,
    color: '#e84393',
    description: 'سداسي أرجواني جريء بكمال هندسي وحضور لافت.'
  },
  {
    id: 'hex-gold',
    name: 'سداسي ذهبي',
    price: 79,
    shape: 'hexagon' as const,
    color: '#d4a53c',
    description: 'سداسي ذهبي فاخر يشع أناقة ورقي.'
  },
  {
    id: 'cube-magenta',
    name: 'مكعب أرجواني',
    price: 55,
    shape: 'cube' as const,
    color: '#e84393',
    description: 'مكعب أرجواني كهربائي بجماليات عصرية وشخصية جريئة.'
  },
  {
    id: 'hex-teal',
    name: 'سداسي فيروزي',
    price: 65,
    shape: 'hexagon' as const,
    color: '#1f9d8a',
    description: 'سداسي فيروزي هادئ يجلب السكينة والتوازن لمجموعتك.'
  },
];

export default function Products() {
  return (
    <>
      <Helmet>
        <title>تسوق الأشكال ثلاثية الأبعاد | أبعاد</title>
        <meta name="description" content="تصفح مجموعتنا من المكعبات والسداسيات ثلاثية الأبعاد. احصل على مساعدة الذكاء الاصطناعي لاختيار القطع المثالية لمشروع البناء الخاص بك." />
      </Helmet>

      <div className="min-h-screen bg-hero-gradient">
        <Header />
        
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl animate-pulse-glow delay-200" />
        </div>

        <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          {/* Hero */}
          <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              مجموعتنا
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              اكتشف أشكالنا الهندسية ثلاثية الأبعاد المميزة. كل قطعة مصنوعة بدقة ومصممة للإلهام.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-4 mb-12 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <button className="px-6 py-2 font-display text-lg bg-primary text-primary-foreground rounded-full">
              الكل
            </button>
            <button className="px-6 py-2 font-display text-lg text-foreground/70 hover:text-foreground transition-colors">
              مكعبات
            </button>
            <button className="px-6 py-2 font-display text-lg text-foreground/70 hover:text-foreground transition-colors">
              سداسيات
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="opacity-0 animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </main>
        
        <AIBuildingAssistant />
      </div>
    </>
  );
}
