import { useState, useEffect } from 'react';
import coordinatorImage from '../../assets/member6.jpg';

function Coordinator() {
  const achievements = [
    { title: "Best NSS Programme Officer", image: "../../assets/acheivement1.jpg" },
    { title: "Best NSS Programme Officer", image: "../../assets/acheivement2.jpg" },
    { title: "Best NSS Programme Officer", image: "../../assets/acheivement3.jpg" },
  ];

  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through achievement cards every 3 seconds unless hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % achievements.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, achievements.length]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Main Content Section */}
      <section
        className="flex-grow py-12 px-6 bg-gray-100 bg-opacity-80"
        style={{
          backgroundImage: 'url("/src/assets/about-container-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Coordinator Information */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Coordinator Image */}
            <div className="relative group flex-shrink-0">
              <img
                src={coordinatorImage}
                alt="Dr. D. S. Raghuvanshi"
                className="h-64 w-64 md:h-80 md:w-80 rounded-full object-cover border-4 border-blue-600 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-blue-800"
              />
              <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            {/* Coordinator Text */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dr. D. S. Raghuvanshi
              </h1>
              <p className="text-xl font-semibold text-blue-600 mb-6">
                Programme Coordinator, CSVTU
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                "I am exceedingly gratified to learn that the NSS CSVTU volunteers are highlighting its achievements and services for the betterment of the society under the guidance of programme officers. NSS instils a sense of patriotism among students and inspires them to serve the country which makes them responsible citizens also it develops their personality.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-6">
                The units have done exemplary work which bridges the gap between rural and urban population with a positive outlook for the change in society. Taking up Shramdaan, Medical camps, blood donation and other creative activities in the adopted villages and village campsites bring about the development in the personality of the youth and is aimed at spreading up the rural development and promoting public awareness."
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`relative bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600 overflow-hidden group transition-all duration-300 ${
                  activeCard === idx && !isHovered ? 'scale-105 shadow-xl border-blue-800' : ''
                }`}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveCard(idx);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Pseudo-element for left-to-right blue fill on hover */}
                <div
                  className="absolute inset-0 bg-blue-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                ></div>
                {/* Content */}
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="h-48 w-full object-cover rounded-md mb-6 relative z-10"
                />
                <p className="relative text-gray-600 group-hover:text-white transition-colors duration-300 text-center font-semibold text-lg z-10">
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Coordinator;