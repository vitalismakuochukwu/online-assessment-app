import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <header 
      className="relative text-white text-center py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Empowering Education <br /> Through Technology
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200">
          Experience the future of online assessments with instant feedback, 
          comprehensive analytics, and a seamless interface designed for success.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/dashboard" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition transform hover:scale-105 shadow-lg">
              Get Started Now
            </Link>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;