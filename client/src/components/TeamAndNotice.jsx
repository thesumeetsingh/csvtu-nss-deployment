import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config';
// Team Images
import teamMember1 from '../assets/member1.jpg';
import teamMember2 from '../assets/default.jpg';
import teamMember3 from '../assets/nss-logo.png';
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
    name: "NSS BADGE",
    designation: "",
    image: teamMember3,
  },
  {
    name: "Dr. Ankit Arora",
    designation: "Registrar",
    image: teamMember2,
  },
  {
    name: "Dr. Ashok Shroti",
    designation: "Deputy Programme Adviser Ministry of Youth Affairs and Sports, Govt. of India",
    image: teamMember4,
  },
  {
    name: "Dr. Neeta Bajpai",
    designation: "Chhattisgarh State NSS Officer",
    image: teamMember5,
  },
  {
    name: "Dr. DS Raghuvanshi",
    designation: "Programme Coordinator",
    image: teamMember6,
  },
];

function TeamAndNotice() {
  const newsRef = useRef(null);
  const sectionRef = useRef(null);
  const [notices, setNotices] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch the latest 10 notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notices?limit=10&sort=-date`);
        if (!response.ok) throw new Error('Failed to fetch notices');
        const data = await response.json();
        setNotices(data.slice(0, 10)); // Ensure only 10 notices
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchNotices();
  }, []);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Smooth continuous scrolling when section is visible
  useEffect(() => {
    if (!isVisible || notices.length === 0) return;

    let animationFrameId;
    const scrollSpeed = 0.2; 
    const noticeHeight = 60; // Height of each notice in pixels
    const totalHeight = notices.length * noticeHeight;

    const animate = () => {
      setScrollOffset((prevOffset) => {
        const newOffset = prevOffset + scrollSpeed;
        if (newOffset >= totalHeight) {
          return 0; // Reset to start for continuous loop
        }
        return newOffset;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, notices.length]);

  // Handle PDF view
  const handleViewPdf = (fileId) => {
    const pdfUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    window.open(pdfUrl, '_blank');
  };

  // Handle View All navigation
  const handleViewAll = () => {
    navigate('/notice');
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-6 bg-[#F3F4F6] w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Team Section (Left Side) */}
        <div className="w-full lg:w-[70%] bg-gray-800 border border-gray-600 rounded-3xl px-6 py-10">
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our NSS CSVTU Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-gray-800 rounded-lg p-4 flex flex-col items-center"
              >
                <div className="flex flex-col items-center group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover mb-4 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400"
                  />
                  <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-blue-400 text-center">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-blue-300 text-center">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board (Right Side) */}
        <div id="noticeboard" className="w-full lg:w-[30%] bg-[#202B6B] text-white rounded-2xl shadow-lg flex flex-col" style={{ minHeight: '400px' }}>
          <div className="border-b border-white/40 px-4 py-3 bg-[#202B6B] z-10 sticky top-0">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <i className="fas fa-list-ul" />
              Notice Board
            </h2>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={newsRef}
              className="absolute top-0 left-0 w-full overflow-hidden"
              style={{ height: 'calc(100% - 60px)' }} // Adjust for header and footer
            >
              <div
                className="flex flex-col gap-2"
                style={{
                  transform: `translateY(-${scrollOffset}px)`,
                  transition: 'transform 0s linear', // Disable CSS transition for smooth JS control
                  position: 'relative',
                  padding: '0 8px', // Padding left and right for notices
                }}
              >
                {[...notices, ...notices].map((notice, idx) => (
                  <div key={idx} className={`min-h-[60px] flex items-center ${idx % 2 === 0 ? 'bg-blue-900' : ''}`}>
                    <div className="text-sm font-medium flex items-center justify-between w-full pr-6">
                      <span className="text-sm text-white mr-2">
                        {new Date(notice.date).toLocaleDateString('en-GB')}
                      </span>
                      <span className="flex-1 truncate">{notice.heading}</span>
                      <button
                        onClick={() => handleViewPdf(notice.googleDriveLink)}
                        className="text-blue-300 hover:underline whitespace-nowrap"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/40 text-center py-2">
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
            >
              <i className="fas fa-eye" />
              View All
            </button>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        #noticeboard {
          position: relative;
          border-radius: 1rem; /* Apply rounded corners to top and bottom */
        }
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default TeamAndNotice;