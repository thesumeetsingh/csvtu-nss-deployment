import objectiveBackground from '../assets/objective-background.jpg';
import theemblemBackground from '../assets/theemblem-background.jpg';
import nssbadgeBackground from '../assets/nssbadge-background.jpg';
import aboutBackground from '../assets/about-container-bg.jpg';

function AboutNSS() {
  return (
    <section className="py-3 text-center w-full bg-gray-100">
      <div
        className="relative mx-2 sm:mx-4 lg:mx-6 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url(${aboutBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Container Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl z-0"></div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-12 py-10">
          <h2 className="text-3xl font-bold mb-10 text-black">About NSS</h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full">
            {/* Card Template */}
            {[
              {
                title: 'The Emblem',
                bg: theemblemBackground,
                overlay: 'bg-blue-900',
                text: `The Symbol of the National Service Scheme, as appearing on the cover, is based on the 'Rath' wheel of the Konark Sun Temple of Orissa. These giant wheels of the Sun Temple portray the cycle of time, preservation, and release, and signify the movement in life across time and space. The wheel is the progressive cycle of life. It stands for continuity as well as change and implies on the part of NSS for continuous striving forward for social transformation and upliftment.`,
              },
              {
                title: 'The Objective',
                bg: objectiveBackground,
                overlay: 'bg-red-900',
                text: `The National Service Scheme (NSS) aims to develop the personality of students through community service. It encourages youth to engage in voluntary work that promotes social and civic responsibility, national integration, and community development. Through various activities, NSS helps students understand the needs of society, foster leadership and teamwork, and contribute to nation-building with the spirit of selfless service. Guided by the motto "Not Me, But You," NSS inspires students to work for the welfare of others and become responsible citizens.`,
              },
              {
                title: 'NSS Badge',
                bg: nssbadgeBackground,
                overlay: 'bg-gray-900',
                text: `The NSS symbol is embossed on the NSS Badge. The N.S.S. volunteers wear it while undertaking various community programs of community service. There are 24 wheels in the 'Rath' of the Sun Temple of Konark. Each wheel has eight bars, which represents 8 pahars of a day. Hence, the badge reminds the wearer to be in readiness for service of the nation round the clock, i.e., for 24 hours. The RED colour in the badge indicates that the NSS volunteers are full of blood, i.e., lively, active, and spirited. The NAVY BLUE colour indicates the cosmos of which the NSS is a tiny part, ready to contribute its share for the welfare of mankind..`,
              },
            ].map(({ title, bg, overlay, text }) => (
              <div
                key={title}
                className="relative min-h-[230px] rounded-3xl p-0 overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-red-300/50 border hover:border-red-500"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay */}
                <div className={`absolute inset-0 ${overlay} opacity-80 rounded-3xl`}></div>

                {/* Content Split: 30% title, 70% text */}
                <div className="relative z-10 h-full flex flex-col text-left text-white">
                  {/* Title (30%) */}
                  <div className="flex-1 p-6 flex items-end">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                  </div>

                  {/* Text Content (70%) */}
                  <div className="flex-[2] p-6 pt-0">
                    <p className="text-base leading-relaxed">{text}</p>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutNSS;
