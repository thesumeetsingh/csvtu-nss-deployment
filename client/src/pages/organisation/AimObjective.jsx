import nssLogo from '../../assets/nss-logo.png';
import bgImage from '../../assets/about-container-bg.jpg';

function AimObjective() {
  const objectives = [
    "Understand the community in which they work",
    "Understand themselves in relation to their community",
    "Identify the needs and problems of the community and involve them in problem-solving",
    "Develop among themselves a sense of social and civic responsibility",
    "Utilise their knowledge in finding practical solutions to individual and community problems",
    "Develop competence required for group-living and sharing of responsibilities",
    "Gain skills in mobilising community participation",
    "Acquire leadership qualities and democratic attitudes",
    "Develop capacity to meet emergencies and natural disasters",
    "Practise national integration and social harmony"
  ];

  return (
    <div
      className="min-h-screen py-16 px-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(243,244,246,0.9)',
      }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8 drop-shadow">
        AIM & OBJECTIVE OF NATIONAL SERVICE SCHEME
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {objectives.map((obj, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-lg shadow-md border-l-4 border-blue-600 
                       hover:bg-blue-600 hover:text-white hover:shadow-xl hover:scale-[1.01] 
                       transition-all duration-300 ease-in-out"
          >
            <p className="font-medium text-lg">{index + 1}. {obj}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-white bg-opacity-95 p-8 rounded-lg shadow-md">
        {/* Motto */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Motto</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The Motto of NSS <strong>"Not Me But You"</strong>, reflects the essence of democratic living and upholds the need for self-less service. It emphasizes that the welfare of an individual is ultimately dependent on the welfare of the society and therefore, NSS volunteers strive for the well-being of society.
        </p>

        {/* Logo */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">NSS Logo</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The logo for the NSS is based on the giant Rath Wheel of the world-famous Konark Sun Temple (The Black Pagoda) situated in Odisha. The Red & Blue colors in the logo inspire NSS volunteers to be active, energetic, and socially conscious. It portrays the cycle of creation, preservation, and release—symbolizing continuity and the constant striving for social change.
        </p>

        {/* Badge */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">NSS Badge</h2>
        <div className="flex items-start gap-4 mb-4">
          <img src={nssLogo} alt="NSS Logo" className="h-16 w-auto" />
          <p className="text-gray-700 leading-relaxed">
            The NSS badge represents 24 hours of service, denoted by the 8 bars in the wheel. The red colour symbolizes youthful energy and enthusiasm, while the navy blue colour reflects the vast cosmos, in which NSS is a small but significant part committed to the welfare of humanity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AimObjective;
