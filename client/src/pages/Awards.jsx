import AwardsSection from '../components/Awards';

function Awards() {
  const objectives = [
    {
      title: "Objective 1",
      text: "To recognize outstanding contribution by NSS student volunteers, NSS Programme Officers and the Programme Coordinators in community service.",
      bgImage: "/src/assets/event04.jpg",
    },
    {
      title: "Objective 2",
      text: "To encourage young NSS student volunteers to develop their personality through community service.",
      bgImage: "/src/assets/event02.jpg",
    },
    {
      title: "Objective 3",
      text: "To encourage the Programme Officers and the Programme Coordinators of NSS for catering the needs of National Service Scheme through the NSS volunteers.",
      bgImage: "/src/assets/event06.jpg",
    },
    {
      title: "Objective 4",
      text: "To motivate NSS Volunteers for continuing their selfless service towards community work.",
      bgImage: "/src/assets/event10.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Main Content Section */}
      <section
        className="flex-grow py-12 px-6 bg-gray-100 bg-opacity-80"
        style={{
          backgroundImage: 'url("/src/assets/nss-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          National Service Scheme Awards
        </h1>

        {/* Ministry of Youth Affairs Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            The Ministry of Youth Affairs and Sports, Government of India had instituted the National Service Scheme Awards to recognize the voluntary service rendered by NSS volunteers, Programme Officers, N.S.S. units and the university/senior secondary council.
          </p>
        </div>

        {/* Objectives Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Objectives of National Service Scheme Award
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300 min-h-[200px] bg-opacity-80"
                style={{
                  backgroundImage: `url(${objective.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'overlay',
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {objective.title}
                </h3>
                <p className="text-gray-600">{objective.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section from Components */}
      <section className="py-12 px-6 bg-[#F3F4F6]">
        <AwardsSection />
      </section>
    </div>
  );
}

export default Awards;