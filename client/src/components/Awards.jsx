import { useState, useEffect } from 'react';

// Import award images
import award01 from '../assets/award01.jpg';
import award02 from '../assets/award02.jpg';
import award03 from '../assets/award03.jpg';
import award04 from '../assets/award04.jpg';
import award05 from '../assets/award05.jpg';
import award06 from '../assets/award06.jpg';
import award07 from '../assets/award07.jpg';

// Adjustable dimensions for a single card (you can tweak these values)
const CARD_HEIGHT = '500px'; // Height of each card
const IMAGE_HEIGHT = '200px'; // Height of the award image
const CARD_WIDTH_PX = 576; // 30% of 1920px (0.3 * 1920 = 576px)

function Awards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Award data (7 cards)
  const awards = [
    {
      title: "State Level Best NSS Volunteer",
      description: "Volunteer Deveashish Patel of Government Engineering College Raipur selected for Chhattisgarh State Level Best Volunteer Governor Award 2022 amoung approximately two lakh volunteers.",
      image: award01,
    },
    {
      title: "Republic Day Parade 2023 ",
      description: "The Volunteers of National Service Scheme Cell of CSVTU, Bhilai the NSS Regional Directorate Bhopal (Central Zone) in the Republic Day Parade 2023. Volunteer Mrityunjay Sahu has recieved the honour to be the Left Platoon Commander. Volunteers Priyanka Sahu and Sahu Vaishnav were also the part of the parade in the Rajpath in the file amoung the 200 selected NSS Volunteers. The volunteers attended the Republic Day Parade Camp, 2023 in Delhi ",
      image: award02,
    },
    {
      title: "Presidential Award",
      description: "On NSS Foundation Day, volunteer Deepak Sinha from NSS-SSTC received National NSS Award in Volunteer Category for session 2020-21 from our Honorable President Smt. Draupadi Murmu at Rashtrapati Bhavan on 24th September 2022. Deepak Sinha received the award for his exceptional work for collecting Rs. 20600 funds for Kerela Flood Relief Funds and he's also been SVEEP Campus Ambassador, Ek Bharat Shreshth Bharat Project Manager and worked for spreading awareness for No Plastic, Women Empowerment, Green India, Impacting Education, Fit India, Rural Development and many more.",
      image: award03,
    },
    {
      title: "Presidential Award",
      description: "On 24th September, On the Occasion of National Service Scheme Day, Shri Shankaracharya Technical Campus NSS Unit And Program Officer Dr D S Raghuwanshi was facilitated by Our President of India, Shri Ram Nath Kovind National Awards: Best NSS Unit and Best Program Officer",
      image: award04,
    },
    {
      title: "IG National Award",
      description: "NSS Volunteer, Simardeep Singh Syal from SSGI Won Indra Gandhi National Award 2017 - 2018 and facilitated by International award at BRICS Summit",
      image: award05,
    },
    {
      title: "Republic Day Parade 2021",
      description: "NSS Volunteers, Jitesh Dewangan from SSTC was selected for R.D. Parade 2021 on Republic Day at Red Fort Delhi in front of Our Prime Minister and President of India.",
      image: award06,
    },
    {
      title: "Republic Day Parade 2019",
      description: "NSS Volunteer, Rakesh Kumar was selected for R.D. Parade 2019 at Red Fort Delhi in front of Our Prime Minister and President of India.",
      image: award07,
    },
  ];

  // Infinite sliding effect (right to left)
  useEffect(() => {
    const totalAwards = awards.length;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalAwards; // Loop back to 0
        return nextIndex;
      });
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [awards.length]);

  // Handle dot click to jump to a specific card
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Calculate the transform for sliding
  // Since each card is CARD_WIDTH_PX wide, and we show 3 cards at a time (1728px total),
  // we slide by CARD_WIDTH_PX per card
  const translateX = -currentIndex * CARD_WIDTH_PX;

  return (
    <section className="py-16 text-center w-full bg-[#F3F4F6]">
      {/* Wrapper for the awards section */}
      <div className="mx-5 sm:mx-6 lg:mx-8 border border-gray-300 rounded-3xl overflow-hidden">
        <div className="px-0 py-10 bg-white">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">Our Awards</h2>

          {/* Carousel Container */}
          <div className="relative overflow-hidden max-w-[1728px] mx-auto px-0">
            {/* Sliding Cards */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${translateX}px)`,
                width: `${awards.length * CARD_WIDTH_PX}px`, // Total width of the sliding track
              }}
            >
              {/* Render awards twice for infinite loop effect */}
              {[...awards, ...awards].map((award, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex justify-center px-2 sm:px-4"
                  style={{ width: `${CARD_WIDTH_PX}px` }}
                >
                  <div
                    className="bg-gray-100 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      height: CARD_HEIGHT,
                      width: '100%', // Take the full width of the outer container (576px)
                    }}
                  >
                    {/* Award Image */}
                    <img
                      src={award.image}
                      alt={award.title}
                      className="rounded-lg mb-4 mx-auto"
                      style={{
                        height: IMAGE_HEIGHT,
                        width: '100%', // Take the full width of the card (576px)
                        objectFit: 'contain',
                      }}
                    />
                    {/* Award Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{award.title}</h3>
                    {/* Award Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center mt-6 space-x-3">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-gray-900 scale-125' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;