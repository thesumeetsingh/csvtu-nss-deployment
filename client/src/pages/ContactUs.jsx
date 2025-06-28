import ContactForm from '../components/ContactForm';
import { FaUser, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Section with Background */}
      <section
        className="py-16 px-8 bg-gray-100 bg-opacity-80"
        style={{
          backgroundImage: 'url("../assets/about-container-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center text-blue-900 mb-12">
          CONTACT US
        </h2>

        {/* Map + Form in same height */}
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left: Map */}
          <div className="w-full md:w-[55%]">
            <iframe
              title="CSVTU Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16746.10633683745!2d81.35333055959545!3d21.138187888616052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a29249845000007%3A0xae9660fbcd26d492!2sChhattisgarh%20Swami%20Vivekanand%20Technical%20University!5e1!3m2!1sen!2sin!4v1750672318534!5m2!1sen!2sin"
              className="w-full h-full min-h-[20rem] rounded-lg shadow-lg"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full md:w-[45%]">
            <ContactForm />
          </div>
        </div>

        {/* Unified Info Row */}
        <div className="mt-8 max-w-7xl mx-auto bg-white-100 text-blue-900 p-6 rounded-lg shadow flex flex-col md:flex-row justify-between gap-6">
          {/* NSS PO Info - Left */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaBuilding /> NSS CSVTU 
              
            </h3>
              <p className="flex items-center gap-2">
              Office
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> 0788-2445032
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> nss@csvtu.ac.in
            </p>
          </div>

          {/* Coordinator Info - Right */}
          <div className="space-y-1 text-right">
            <h3 className="text-xl font-semibold flex justify-end items-center gap-2">
              <FaUser />  Dr. D.S. Raghuvanshi
            </h3>
            <p className="flex justify-end items-center gap-2">
              Program Coordinator
            </p>
            <p className="flex justify-end items-center gap-2">
              <FaPhone /> +91 9424514075
            </p>
            <p className="flex justify-end items-center gap-2">
              <FaEnvelope /> dsraghu29@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;