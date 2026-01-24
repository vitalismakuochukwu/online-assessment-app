const StatsSection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-24 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-2">10,000+</div>
            <div className="text-blue-100 text-lg font-medium">Questions Solved</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-blue-400"></div>
          <div>
            <div className="text-5xl font-extrabold mb-2">500+</div>
            <div className="text-blue-100 text-lg font-medium">Active Students</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-blue-400"></div>
          <div>
            <div className="text-5xl font-extrabold mb-2">98%</div>
            <div className="text-blue-100 text-lg font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;