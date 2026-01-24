const ServicesSection = () => {
  const services = [
    {
      title: "Real-time Grading",
      description: "Experience the power of instant gratification. Our automated grading system evaluates answers immediately, providing students with detailed performance analytics and correct solutions instantly.",
      icon: "⚡"
    },
    {
      title: "Equation Support",
      description: "Mathematics and Sciences require precision. Our advanced LaTeX rendering engine ensures that every formula, equation, and scientific symbol is displayed with textbook-quality clarity.",
      icon: "∑"
    },
    {
      title: "Secure Environment",
      description: "Integrity is paramount. Our platform employs advanced security measures to prevent academic dishonesty, ensuring a fair and level playing field for every student taking an assessment.",
      icon: "🔒"
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Premium Services</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 bg-gray-50">
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="font-bold text-2xl mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;