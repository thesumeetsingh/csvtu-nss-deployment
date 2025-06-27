import teamMember1 from '../assets/member1.jpg';
import teamMember2 from '../assets/default.jpg';
import teamMember3 from '../assets/member3.jpg';
import teamMember4 from '../assets/member4.jpg';
import teamMember5 from '../assets/member5.jpg';
import teamMember6 from '../assets/member6.jpg';

const teamMembers = [
  {
    name: "Prof. Sachchidanand Shukla",
    designation: "Vice Chancellor",
    image: teamMember1,
  },
  {
    name: "Dr. Ankit Arora",
    designation: "Registrar",
    image: teamMember2,
  },
    {
    name: "Dr. Pankaj Mishra",
    designation: "Director, University Teaching Department",
    image: teamMember3,
  },
  {
    name: "Dr. Ashok Shroti",
    designation: "Deputy Programme Adviser Ministry of Youth Affairs and Sports, Govt. of India",
    image: teamMember4,
  },
  {
    name: "Dr. Neeta Bajpai",
    designation: "Chhattisgarh State NSS Officer ",
    image: teamMember5,
  },

  {
    name: "Dr. DS Raghuvanshi",
    designation: "Programme Coordinator",
    image: teamMember6,
  },
];

function TeamNSS() {
  return (
    <section className="py-16 text-center w-full bg-[#F3F4F6]">
      {/* Wrapper with background, border, and spacing */}
      <div className="mx-5 sm:mx-6 lg:mx-8 bg-gray-800 border border-gray-600 rounded-3xl">
        {/* Content */}
        <div className="px-6 sm:px-8 lg:px-12 py-10">
          <h2 className="text-3xl font-bold mb-10 text-white">Our NSS CSVTU Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mx-auto w-full">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-gray-800 rounded-lg p-6"
              >
                <div className="flex flex-col items-center group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full border-4 border-gray-600 object-cover mb-4 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-blue-400">
                    {member.name}
                  </h3>
                  <p className="text-lg text-gray-300 transition-colors duration-300 group-hover:text-blue-300">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamNSS;