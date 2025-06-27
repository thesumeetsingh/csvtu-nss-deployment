function AdminStructure() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      {/* Main Content Section */}
      <section className="flex-grow py-12 px-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
          National Service Scheme Chhattisgarh Swami Vivekanand Technical University
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Administrative Structure
        </h2>
       <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center ">
      <div className="max-w-6xl w-full">
        <img
          src="../src/assets/structure.png"
          alt="Administrative Structure"
          className="w-full h-auto"
        />
      </div>
    </div>
        
      </section>
    </div>
  );
}

export default AdminStructure;