import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SocialSection from "@/components/SocialSection";
import FooterSection from "@/components/FooterSection";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <main className="overflow-x-hidden relative">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <SocialSection />
      <FooterSection />
      <ChatWidget />
    </main>
  );
};

export default Index;
