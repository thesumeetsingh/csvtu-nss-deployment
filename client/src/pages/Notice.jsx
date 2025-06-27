import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState({ date: '', heading: '' });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';
  // Fetch all notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notices`);
        if (!response.ok) throw new Error('Failed to fetch notices');
        const data = await response.json();
        // Sort by date descending (most recent first)
        setNotices(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchNotices();
  }, []);

  // Handle PDF view
  const handleViewPdf = (fileId) => {
    const pdfUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    window.open(pdfUrl, '_blank'); // Open full Google Drive URL in new tab
  };

  // Filter notices
  const filteredNotices = notices.filter((notice) => {
    const dateMatch = !filter.date || new Date(notice.date).toLocaleDateString('en-GB').includes(filter.date);
    const headingMatch = !filter.heading || notice.heading.toLowerCase().includes(filter.heading.toLowerCase());
    return dateMatch && headingMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold mb-6">All Notices</h2>

      {/* Filter Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Filter Notices</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="filterDate" className="block text-gray-700 font-medium mb-2">
              Filter by Date
            </label>
            <input
              type="text"
              id="filterDate"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 21/06/2025"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="filterHeading" className="block text-gray-700 font-medium mb-2">
              Filter by Heading
            </label>
            <input
              type="text"
              id="filterHeading"
              value={filter.heading}
              onChange={(e) => setFilter({ ...filter, heading: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter heading keyword"
            />
          </div>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {filteredNotices.length === 0 ? (
          <p className="text-gray-600">No notices available or matching filter</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-gray-700">Heading</th>
                  <th className="px-4 py-2 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice, index) => (
                  <tr key={notice._id} className="border-t">
                    <td className="px-4 py-2">{new Date(notice.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-2">{notice.heading}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleViewPdf(notice.googleDriveLink)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notice;