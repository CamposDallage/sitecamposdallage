import Hero from '@/components/Hero';
import TwoPathsSection from '@/components/TwoPathsSection';
import ServicesGrid from '@/components/ServicesGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoPathsSection />
      <ServicesGrid />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
