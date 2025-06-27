function Departments() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Departments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Educational Outreach" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Educational Outreach</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Environment & Sustainability" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Environment & Sustainability</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Campus Engagement" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Campus Engagement</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Contech" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Contech</h3>
        </div>
      </div>
    </section>
  );
}

export default Departments;