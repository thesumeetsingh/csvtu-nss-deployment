import unicefLogo from '../assets/unicef-logo.png';
import ekBharatLogo from '../assets/ek-bharat-logo.png';
import digitalIndiaLogo from '../assets/digital-india-logo.png';
import swachhBharatLogo from '../assets/swachh-bharat-logo.png';
import fitIndiaLogo from '../assets/fit-india-logo.png';
const imageHeight = '80px';
const maxWidth = '160px';
function Footer() {
  const logos = [
    { src: unicefLogo, alt: 'UNICEF Logo' },
    { src: ekBharatLogo, alt: 'Ek Bharat Shreshtha Bharat Logo' },
    { src: digitalIndiaLogo, alt: 'Digital India Logo' },
    { src: swachhBharatLogo, alt: 'Swachh Bharat Logo' },
    { src: fitIndiaLogo, alt: 'Fit India Logo' },
  ];

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto max-w-7xl">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
          <p className="text-gray-300">
            We are a student-led organization at CSVTU dedicated to social impact and community development.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Have a Question?</h3>
          <p className="text-gray-300">NSS Office, CSVTU</p>
          <p className="text-gray-300">Phone: 0788-2445032</p>
          <p className="text-gray-300">NSS Email: nss@csvtu.ac.in</p>
        </div>
      </div>
<div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 mt-8 mb-6">
  {logos.map((logo, idx) => (
    <img
      key={idx}
      src={logo.src}
      alt={logo.alt}
      style={{ height: imageHeight, maxWidth: maxWidth }}
      className="w-auto object-contain"
    />
  ))}
</div>
      <p className="text-center text-gray-500 mt-6">developed by Sumit Sao and Sumeet Singh</p>
      <p className="text-center text-gray-500 ">(BIT DURG)</p>
      <p className="text-center text-gray-500 mt-6">© 2025 NSS CSVTU. All rights reserved.</p>

    </footer>
  );
}

export default Footer;