import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>أبعاد | أشكال هندسية ثلاثية الأبعاد</title>
        <meta name="description" content="أبعاد تقدم مكعبات وسداسيات ثلاثية الأبعاد لمشاريع البناء الخاصة بك. احصل على مساعدة الذكاء الاصطناعي لاختيار القطع المثالية." />
      </Helmet>
      <main className="relative">
        <HeroSection />
      </main>
    </>
  );
};

export default Index;
