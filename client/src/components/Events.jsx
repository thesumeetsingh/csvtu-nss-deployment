import { useEffect, useState } from 'react';

import event01 from '../assets/event01.jpg';
import event02 from '../assets/event02.jpg';
import event03 from '../assets/event03.jpg';
import event04 from '../assets/event04.jpg';
import event05 from '../assets/event05.jpg';
import event06 from '../assets/event06.jpg';
import event07 from '../assets/event07.jpg';
import event08 from '../assets/event08.jpg';
import event09 from '../assets/event09.jpg';
import event11 from '../assets/event11.jpg';

function Events() {
  const CARD_WIDTH = 576;
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const originalEvents = [
    {
      img: event01,
      title: "National Youth Festival 2023",
      desc: "The volunteers of National Service Scheme cell of Chhatisgarh Swami Vivekananda Technical University, Bhilai represented Chhattisgarh State at the National Youth Festival organized in Hubli, Dharwad, Karnataka from 12 to 16 January 2023 by the Government of India, Youth Program. In this youth festival, participants from different states and union territories of the country got an opportunity to learn about their culture etc.",
    },
    {
      img: event02,
      title: "Adventure Camp 2022",
      desc: "3rd Batch for the National Adventure Camp organised by Atal Bihari Vajpayee Institute of Mountaineering and Allied Sports, Dharamshala, H.P has been departed from Chhattisgarh. The arrangement was Managed by Chhattisgarh Swami Vivekanand Technical University,Bhilai. All the best to the selected Volunteers.",
    },
    {
      img: event03,
      title: "Mega Cleanliness Drive 2022",
      desc: "On 19th October 2022, National Service Scheme Cell of Chhattisgarh Swami Vivekananda Technical University, Bhilai (C.G.) organized a university level mega cleanliness drive at Gudicha Manch Sector 10, Bhilai under Clean India Campaign. They run around 1.5km under Fit India Run 3.0 and collected the plastic material. Spread awareness in the society.",
    },
    {
      img: event04,
      title: "One Day Workshop & RD Selection",
      desc: "On this workshop, under National Service Scheme cell of CSVTU, training of Programme Ofiicers of affiliated units was organized at Vishwesharaiya Bhawan. Also on this occasion,the selection of volunteers for the Republic Day parade concluded where their parade skills and cultural capabilities were assessed, as well as distribution of B&C certificates.Program conducted by Ms. Kuzur.",
    },
    {
      img: event05,
      title: "Regional Level Festival",
      desc: "From 12th to 21st September 2024, a 10-day Regional Level NSS Festival was organized at Vidyarthi Bhawan, Central Sanskrit University, Himachal Pradesh, under the guidance of the Government of India, Ministry of Youth Affairs and Sports, and the Regional Directorate, NSS Bhopal. A contingent from Chhattisgarh comprising 10 male NSS volunteers, 10 female NSS volunteers, and one male and one female program officer participated in the event. The participation was coordinated by Sanskrit Technical University, Bhilai. Representing this university, four volunteers – Mr. Komal Dev Saroj (GEC Jagdalpur), Ms. Amisha Sahu (SSTC Junwani, Bhilai), Mr. Vicky Kumar (RCET Bhilai), and Ms. Tanisha Deshmukh (GEC Balodabazar) – actively took part. Alongside them, Mr. Balvant Singh Korram, the NSS Program Officer, also contributed through his participation and support in the festival.",
    },
    {
      img: event06,
      title: "National Integration Camp 2021",
      desc: "National Integration Camp- 2021, Hisar (Haryana)- This camp was organized by Govt of India, Ministry of Youth Affairs and Sports, NSS Regional Directorate Delhi at Chaudhary Charan Singh Haryana Agricultural University, Hisar from 16 to 22nd December 2021. By presenting Dance, Singing, Drama, and Mimickry, the Volunteers made full use of this opportunity by entertaining the fellow NSS volunteers with the sounds of their homeland.",
    },
    {
      img: event07,
      title: "One Day Workshop",
      desc: "Nss Csvtu Bhilai conducted a one day workshop for programme officers on 03 Dec 2021. The guests were Prof. M. K. Verma (Hon'ble Vice Chancellor,CSVTU) , Dr. K. K. Verma (Registrar-CSVTU) , Dr. Samrendra Singh (State NSS Officer) , Dr. R. P. Agrawal (Programme coordinator- Hemchand Yadav University, Durg) , Dr. D.S. Raghuwanshi (Programme Co-ordinator -CSVTU, Bhilai).",
    },
    {
      img: event08,
      title: "Social Media Workshop",
      desc: "On 25th November 2021, NSS Cell Hemchand Yadav University, Durg Chhattisgarh has organized a virtual mode online webinar regarding the use of social media for the promotion of activities through social media. In this webinar, Shri A S Kabir Regional Director, RD Madhya Pradesh - Chhattisgarh, Government of India had said we have to reach out to the people by using social media, with the pace of time- Along with this, we have to change ourself and the activities happening in backward areas can also reach the state, national level, and international level easily.",
    },
    {
      img: event09,
      title: "NSS State-Level Chintan Shivir",
      desc: "A three-day meditation camp was organised by the National Service Scheme Cell of Chhattisgarh State at Prayog Ashram Tilda, District Raipur Ch.G. from 8 to 10 November 2021 Program coordinators, district organizers and program officers and volunteers of various universities of the state participated in this camp.",
    },
    {
      img: event11,
      title: "Selection for the Pre-State Level Road Safety Festival",
      desc: "On 27th September 2024, a Road Safety volunteer selection program was organized at BIT Durg under the NSS Cell of CSVTU. The event aimed to select volunteers for the upcoming Pre-State Level Road Safety Festival. A total of 22 NSS volunteers participated in the selection process, showcasing their awareness, leadership, and communication skills. After evaluation, Kumari Muskan Sahu from GEC Raipur and Mr. Yuvraj Prashad from SSTC Junwani were selected. The program was conducted in the presence of Honrable Vice-Chancellor Prof. M. K. Verma and officials from the Regional Directorate, Bhopal. The selected volunteers will participate in the Pre-State Festival at BIT Patna in November 2024. They will go on to represent the New Delhi route at the State-Level Road Safety Festival in January 2025.",
    },
  ];

  const events = [...originalEvents, ...originalEvents]; // duplicate for loop effect

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events.length]);

  const handleDotClick = (index) => {
    setCurrentEventIndex(index);
  };

  const translateX = -currentEventIndex * CARD_WIDTH;

  return (
    <section className="px-4 md:px-12 py-12 bg-gray-100 w-full">
      <div className="w-full bg-white rounded-2xl shadow-md px-6 py-6 overflow-hidden">
        <h2 className="text-2xl font-bold text-[#202B6B] border-b pb-3 mb-6 text-center">
          Latest Events
        </h2>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${events.length * CARD_WIDTH}px`,
            }}
          >
            {events.map((event, idx) => {
              const isCenter =
                (idx + events.length - currentEventIndex) % events.length === 1;
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${CARD_WIDTH}px` }}
                >
                  <div
                    className={`bg-gray-50 rounded-xl shadow hover:shadow-md transition duration-300 h-[500px] flex flex-col ${
                      isCenter
                        ? 'md:scale-100 z-10 pb-10'
                        : 'md:scale-90 md:opacity-80 pb-10'
                    }`}
                  >
                    <img
                      src={event.img}
                      className="rounded-t-xl h-48 w-full object-cover"
                      alt={event.title}
                    />
                    <div className="p-4 flex flex-col flex-1 overflow-hidden">
                      <p className="text-xs text-gray-500 font-semibold">EVENT</p>
                      <h3 className="text-lg font-bold text-[#202B6B] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-700">{event.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {originalEvents.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === currentEventIndex % originalEvents.length
                    ? 'bg-[#202B6B]'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;
