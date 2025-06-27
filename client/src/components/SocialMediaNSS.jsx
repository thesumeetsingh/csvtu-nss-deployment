import { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import API_BASE_URL from '../config';
function SocialMediaNSS() {
  const [isVisible, setIsVisible] = useState(false);
  const [followerCounts, setFollowerCounts] = useState({
    instagram: 0,
    youtube: 0,
    twitter: 0,
    facebook: 0,
  });
  const sectionRef = useRef(null);

  // Fetch social media data from the backend
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/social-media`);
        const data = await response.json();
        if (data.success) {
          const counts = data.socialMedia.reduce((acc, item) => {
            acc[item.platform.toLowerCase()] = item.followerCount || 0;
            return acc;
          }, { instagram: 0, youtube: 0, twitter: 0, facebook: 0 });
          setFollowerCounts(counts);
        } else {
          console.error('Failed to fetch social media data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching social media data:', error);
      }
    };

    fetchSocialMedia();
  }, []);

  const socialMediaLinks = [
    {
      platform: "Instagram",
      handle: "@nsscsvtu_cg",
      link: "https://www.instagram.com/nsscsvtu_cg/?hl=en",
      icon: <FaInstagram className="text-5xl text-pink-500 group-hover:text-pink-600 group-hover:text-6xl transition-all duration-300 group-hover:rotate-[30deg]" />,
      followers: followerCounts.instagram,
    },
    {
      platform: "YouTube",
      handle: "NSS CSVTU Official",
      link: "https://www.youtube.com/channel/UCypAAfZon1c4EuAW9crRu2w?themeRefresh=1",
      icon: <FaYoutube className="text-5xl text-red-500 group-hover:text-red-600 group-hover:text-6xl transition-all duration-300 group-hover:rotate-[30deg]" />,
      followers: followerCounts.youtube,
    },
    {
      platform: "Twitter",
      handle: "@nsscsvtucg",
      link: "https://x.com/nsscsvtucg",
      icon: <FaXTwitter className="text-4xl text-black group-hover:text-black group-hover:text-6xl transition-all duration-300 group-hover:rotate-[30deg]" />,
      followers: followerCounts.twitter,
    },
    {
      platform: "Facebook",
      handle: "@nsscsvtu cg",
      link: "https://www.facebook.com/profile.php?id=100074265591861",
      icon: <FaFacebookF className="text-5xl text-blue-600 group-hover:text-blue-700 group-hover:text-6xl transition-all duration-300 group-hover:rotate-[30deg]" />,
      followers: followerCounts.facebook,
    },
  ];

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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

  // Count-up animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const incrementTime = duration / steps;

    socialMediaLinks.forEach((social) => {
      const platformKey = social.platform.toLowerCase();
      const targetFollowers = social.followers || 0;
      const increment = Math.ceil(targetFollowers / steps);

      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetFollowers) {
          currentCount = targetFollowers;
          clearInterval(timer);
        }
        setFollowerCounts((prev) => ({
          ...prev,
          [platformKey]: currentCount,
        }));
      }, incrementTime);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  const formatCount = (count) => {
    return count.toString();
  };

  return (
    <section ref={sectionRef} className="py-16 text-center w-full bg-[#f3f4f6]">
      <div className="mx-5 sm:mx-6 lg:mx-8 border border-gray-300 rounded-3xl overflow-hidden">
        <div className="px-6 sm:px-8 lg:px-12 py-10 bg-white">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">Connect With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto w-full">
            {socialMediaLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex flex-col items-center h-[200px] w-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                      {social.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 ml-4 group-hover:text-3xl transition-all duration-300">
                      {social.platform}
                    </h3>
                  </div>
                  <p className="text-lg text-blue-400 group-hover:text-xl transition-all duration-300">
                    {formatCount(followerCounts[social.platform.toLowerCase()])} {social.platform === "YouTube" ? "Subscribers" : "Followers"}
                  </p>
                  <p className="text-lg text-gray-600 mt-2">{social.handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaNSS;