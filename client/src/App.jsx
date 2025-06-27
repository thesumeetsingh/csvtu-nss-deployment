import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Contributions from './components/Contributions';
import AboutNSS from './components/AboutNSS';
import MottoNSS from './components/MottoNSS';
import SocialMediaNSS from './components/SocialMediaNSS';
import Events from './components/Events';
import AwardsSection from './components/Awards';
import AwardsPage from './pages/Awards';
import AboutUs from './pages/organisation/AboutUs';
import AimObjective from './pages/organisation/AimObjective';
import FAQ from './pages/organisation/FAQ';
import AdminStructure from './pages/organisation/AdminStructure'; 
import Coordinator from './pages/organisation/Coordinator'; 
import Login from './pages/Login'; 
import TeamAndNotice from './components/TeamAndNotice';
import Dashboard from './pages/dashboard';
import SocialMediaUpdate from './pages/socialmediaupdate';
import ContributionsUpdate from './pages/contributionsupdate';
import NoticeUpdate from './pages/noticeupdate';
import NSSUnitUpdate from './pages/nssunitsupdate';
import NSSUnits from './pages/organisation/NSSUnits';
import Notice from './pages/Notice';
import UploadPhoto from './pages/UploadPhoto';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import UpdateMonthlyReport from './pages/updateMonthlyReport';
import MonthlyReport from './pages/documents/MonthlyReports';
import EventPage from './pages/EventPage';


function Home() {
  return (
    <div className="space-y-10">
      <MottoNSS />
      <TeamAndNotice/>
      <AboutNSS />
      <Contributions />
      <Events />
      <AwardsSection />
      <SocialMediaNSS />
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] text-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/organisation/about-us" element={<AboutUs />} />
          <Route path="/organisation/aim-objective" element={<AimObjective />} />
          <Route path="/organisation/admin-structure" element={<AdminStructure />} />
          <Route path="/organisation/nss-units" element={<NSSUnits/>} />
          <Route path="/organisation/coordinator" element={<Coordinator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/social-media" element={<SocialMediaUpdate />} />
          <Route path="/dashboard/contributions" element={<ContributionsUpdate />} />
          <Route path="/dashboard/notice" element={<NoticeUpdate />} />
          <Route path="/dashboard/nss-units" element={<NSSUnitUpdate />} />
          <Route path="/dashboard/uploadphoto" element={<UploadPhoto />} />
          <Route path="/dashboard/upload-monthly-report" element={<UpdateMonthlyReport />} />
          <Route path="/organisation/faq" element={<FAQ />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/documents/monthly-reports" element={<MonthlyReport />} />
          <Route path="/documents/announcements" element={<div className="min-h-screen bg-gray-100 p-6"><h1 className="text-3xl font-bold text-gray-800">Announcements</h1><p className="mt-4 text-gray-600">Announcements page content.</p></div>} />
          <Route path="/documents/nss-manual" element={<div className="min-h-screen bg-gray-100 p-6"><h1 className="text-3xl font-bold text-gray-800">NSS Manual</h1><p className="mt-4 text-gray-600">NSS Manual page content.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;