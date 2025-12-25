import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroGLBModel from './HeroGLBModel';
import Header from './Header';
import SocialLinks from './SocialLinks';
import Pagination from './Pagination';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      <Header />
      <SocialLinks />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-teal/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-coral/10 rounded-full blur-3xl animate-pulse-glow delay-200" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full pt-24 pb-32">
          
          {/* Right Content (now on right in RTL) */}
          <div className="space-y-8 opacity-0 animate-slide-in-left lg:order-2" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {/* Slide indicator */}
            <div className="flex items-baseline gap-1">
              <span className="font-display text-5xl lg:text-6xl text-coral">٠١</span>
              <span className="font-body text-sm text-foreground/50">/٠٥</span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-wide">
              <span className="block text-foreground">انفجار</span>
              <span className="block text-foreground">إبداعي</span>
            </h1>

            {/* Description */}
            <p className="font-body text-sm lg:text-base text-foreground/70 max-w-md leading-relaxed">
              أبعاد تجلب الكمال الهندسي إلى مساحتك مع مكعبات وسداسيات ثلاثية الأبعاد المميزة.
              دع مساعد الذكاء الاصطناعي يساعدك في بناء مشروع أحلامك.
            </p>

            {/* CTA Button */}
            <Link to="/products">
              <Button variant="hero" size="lg" className="opacity-0 animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                تسوق الآن
              </Button>
            </Link>
          </div>

          {/* Left - 3D Cube */}
          <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] opacity-0 animate-slide-up lg:order-1" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="absolute inset-0 animate-float">
              <HeroGLBModel />
            </div>
            {/* Glow effect behind cube */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-coral/30 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Large Bottom Typography */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <h2 
          className="font-display text-[12vw] lg:text-[15vw] leading-none tracking-wider text-transparent opacity-0 animate-slide-up"
          style={{ 
            WebkitTextStroke: '2px hsl(var(--coral))',
            animationDelay: '0.8s',
            animationFillMode: 'forwards',
            transform: 'translateY(30%)'
          }}
        >
          أبعاد!
        </h2>
      </div>

      <Pagination />
    </section>
  );
}
