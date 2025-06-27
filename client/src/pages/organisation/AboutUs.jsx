import nssLogo from '../../assets/nss-logo.png';

function AboutUs() {
  const benefits = [
    "an accomplished social leader",
    "an efficient administrator",
    "a person who understands human nature",
  ];

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
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          National Service Scheme Chhattisgarh Swami Vivekanand Technical University
        </h1>

        {/* About National Service Scheme (NSS) */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            About National Service Scheme (NSS)
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            National Service Scheme (NSS) is an initiative of the Ministry of Youth Affairs and Sports of the Government of India. After the Independence of our Nation, there was an urge for introducing social service for students and the idea of involving students in the task of national service was that they should always keep their social responsibility before themselves. The first education commission, Central Advisory Board of Education (CABE) at its meeting in January 1950 recommended the introduction of national service scheme by students voluntarily. In 1958 Jawaharlal Nehru, in a letter to the chief ministers, made recommendation to prepare a scheme for compulsory national service by students as a prerequisite for graduation.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            In May 1969, a conference of student representatives (of universities and institutions of higher education) convened by the Ministry of Education and the University Grants Commission also unanimously agreed that a national-service scheme could be an instrument for national integration. On 24 September 1969, the then Union Education Minister V.K.R.V. Rao launched the NSS at 37 universities all states. It was appropriate that the program was launched during the Gandhi Centenary Year as it was Gandhi ji who inspired the Indian youth to participate in the movement for Indian independence and the social uplift of the downtrodden masses of our nation. Due to hearty responses of students, the scheme has been excellent and extended to all states and universities in the country.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            It provides an opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level of India to take part in various government led community service activities & programs.
          </p>
        </div>

        {/* National Service Scheme in CSVTU */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            National Service Scheme in CSVTU
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The National Service Scheme Started in Chhattisgarh Swami Vivekanand Technical University (CSVTU) in June 2009 with 6 Units at that time. Currently, there reside 67 Units under NSS scheme in CSVTU with more than 5650 Students working hard at creating a better environment and sending a positive message in the world. Our university volunteers have left their mark at many heights like Pre-RD, RD, National Awards and State awards and have bagged awards at these platforms for the last 3 consecutive years. Currently, there are 42 Adopted Villages by our units under CSVTU.
          </p>
        </div>

        {/* NSS Badge Section */}
        <div className="max-w-2xl mx-auto mb-12 bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center justify-center mb-6">
            <img src={nssLogo} alt="NSS Logo" className="h-16 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              The NSS Badge Proud to Serve the Nation
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            All the youth volunteers who opt to serve the nation through the NSS led community service wear the NSS badge with pride and a sense of responsibility towards helping needy.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Konark wheel in the NSS badge having 8 bars signifies the 24 hours of a the day, reminding the wearer to be ready for the service of the nation round the clock i.e. for 24 hours.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Red colour in the badge signifies energy and spirit displayed by the NSS volunteers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The Blue colour signifies the cosmos of which the NSS is a tiny part, ready to contribute its share for the welfare of the mankind.
          </p>
        </div>

        {/* Motto and Benefits Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Motto
          </h2>
          <p className="text-lg font-bold text-blue-600 text-center mb-6">
            The motto of National Service Scheme is NOT ME BUT YOU
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Benefits of Being a NSS Volunteer
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-6">
            A NSS volunteer who takes part in the community service programme would either be a college level or a senior secondary level student. Being an active member these student volunteers would have the exposure and experience to be the following:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 overflow-hidden group"
              >
                {/* Pseudo-element for left-to-right blue fill on hover */}
                <div
                  className="absolute inset-0 bg-blue-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
                ></div>
                {/* Content */}
                <p className="relative text-gray-600 group-hover:text-white transition-colors duration-300 text-center z-10">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;