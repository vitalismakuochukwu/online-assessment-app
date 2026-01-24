import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import HowItWorksSection from './HowItWorksSection';
import StatsSection from './StatsSection';
import ContactSection from './ContactSection';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-black">
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <HowItWorksSection />
        <StatsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;