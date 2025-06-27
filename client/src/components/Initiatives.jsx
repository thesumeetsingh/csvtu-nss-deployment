function Initiatives() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Initiatives</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Flare" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Flare</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Mangrove Clean-Up" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Mangrove Clean-Up</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Field Visit" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Field Visit</h3>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <img src="https://via.placeholder.com/200" alt="Orphanage Visits" className="w-full h-32 object-cover rounded mb-4" />
          <h3 className="text-lg font-semibold">Orphanage Visits</h3>
        </div>
      </div>
      <button className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">See All</button>
    </section>
  );
}

export default Initiatives;