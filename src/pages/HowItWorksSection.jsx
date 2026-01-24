const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Profile",
      description: "Create your account in seconds. Customize your dashboard and set up your preferences to get ready for a personalized learning experience."
    },
    {
      step: "02",
      title: "Take Assessments",
      description: "Browse assigned tests or practice quizzes. Our intuitive interface makes navigating through complex questions smooth and distraction-free."
    },
    {
      step: "03",
      title: "Instant Analytics",
      description: "Receive your results instantly upon submission. Review detailed explanations for every question to understand your mistakes and master the material."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="relative p-6">
              <div className="text-6xl font-bold text-blue-600 opacity-20 absolute -top-4 left-4 select-none">
                {item.step}
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-2xl mb-4 text-blue-400">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;