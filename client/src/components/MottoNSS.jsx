import { useState, useEffect } from 'react';
import bg01 from '../assets/bg-image-01.jpg';
import bg02 from '../assets/bg-image-02.jpg';
import bg03 from '../assets/bg-image-03.jpg';
import bg04 from '../assets/bg-image-04.jpg';
import bg05 from '../assets/bg-image-05.jpg';
import bg06 from '../assets/bg-image-06.jpg';
import bg07 from '../assets/bg-image-07.jpg';
import bg08 from '../assets/bg-image-08.jpg';
import bg09 from '../assets/bg-image-09.jpg';
import bg10 from '../assets/bg-image-10.jpg';

import csvtuLogo from '../assets/csvtu-logo.png';
import nssLogo from '../assets/nss-logo.png';

const backgroundImages = [
  bg01, bg02, bg03, bg04, bg05,
  bg06, bg07, bg08, bg09, bg10
];

function MottoNSS() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const stayDuration = 2000;
    const transitionDuration = 1000;
    const totalDuration = stayDuration + transitionDuration;

    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const next = prevPosition + 1;
        if (next === backgroundImages.length) {
          setTimeout(() => {
            setPosition(0);
          }, transitionDuration);
        }
        return next;
      });
    }, totalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="motto"
      style={{ minHeight: 'calc(100vh - 5.5rem)', scrollMarginTop: '5.5rem' }}
      className="relative overflow-hidden"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className={`flex h-full transition-transform duration-1000 ease-in-out ${position === 0 ? 'no-transition' : ''}`}
          style={{
            transform: `translateX(-${position * 100}vw)`,
            width: `${(backgroundImages.length + 1) * 100}vw`
          }}
        >
          {[...backgroundImages, backgroundImages[0]].map((image, index) => (
            <div
              key={index}
              className="w-screen h-full flex-shrink-0 relative bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center min-h-screen px-4 text-white text-center gap-6 sm:gap-12">
        {/* Left Logo */}
        <div className="relative">
          <img
            src={csvtuLogo}
            alt="CSVTU Logo"
            className="max-h-[200px] w-auto object-contain relative"
          />
        </div>

        {/* Center Text */}
        <div className="flex flex-col items-center">
          <h1 className="text-[100px] sm:text-[120px] font-extrabold leading-tight mb-3">NSS CSVTU</h1>
          <h2 className="text-2xl sm:text-3xl mb-2">OUR MOTTO</h2>
          <p className="text-5xl sm:text-6xl font-bold">"Not Me, But You"</p>
        </div>

        {/* Right Logo */}
        <div className="h-[200px] flex items-center">
          <img
            src={nssLogo}
            alt="NSS Logo"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      {/* Extra CSS */}
      <style>{`
        .no-transition {
          transition: none !important;
        }
      `}</style>
    </section>
  );
}

export default MottoNSS;
