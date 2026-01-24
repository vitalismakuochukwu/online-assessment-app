const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-blue-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About Our Mission</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At <span className="font-bold text-blue-600">OnlineAssess</span>, we are dedicated to transforming the educational landscape through technology. 
          Our platform bridges the gap between traditional testing and modern needs, offering a seamless interface for teachers to assess and students to excel.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We believe that feedback should be instant, learning should be continuous, and technology should be accessible to all. 
          Whether you are a student preparing for finals or an educator managing a classroom, we provide the tools you need to succeed.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;