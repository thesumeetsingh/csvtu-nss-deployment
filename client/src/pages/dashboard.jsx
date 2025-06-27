import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard: useEffect triggered');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Dashboard: Stored User:', storedUser);
    if (!storedUser || storedUser.role !== 'admin') {
      console.log('Dashboard: Redirecting to /login');
      navigate('/login');
      return;
    }
    setUser(storedUser);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <p className="text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <p className="text-red-500">Authentication error. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Admin Dashboard
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Welcome, {user.username}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/social-media')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">Social Media</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">Update follower counts for social platforms</p>
          </div>
          <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/contributions')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">Contributions</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">Update volunteer and activity counts</p>
          </div>
          <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/notice')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">Notices</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">Manage notices (upload and delete notice)</p>
          </div>
          <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/uploadphoto')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">Upload Gallery Photo</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">Upload or delete photos in the gallery</p>
          </div>
 <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/upload-monthly-report')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">Update Monthly Report</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">upload monthly report pdf files</p>
          </div>
          <div
            className="group border-2 border-transparent bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-600 hover:bg-blue-600 transition-all cursor-pointer"
            onClick={() => navigate('/dashboard/nss-units')}
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white mb-2 transition-colors">NSS Units</h3>
            <p className="text-gray-600 group-hover:text-white transition-colors">Manage NSS units (add/remove NSS UNITS)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;