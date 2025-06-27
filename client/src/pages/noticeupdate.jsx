import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function NoticeUpdate() {
  const [heading, setHeading] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterHeading, setFilterHeading] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';

  const navigate = useNavigate();

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser || storedUser.role !== 'admin') {
    navigate('/login');
    return;
  }
}, [navigate]);


  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/notices`);
        if (!response.ok) throw new Error('Failed to fetch notices');
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!heading || !date || !file) {
      setError('All fields are required');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('date', date);
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/notices`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create notice');
      const newNotice = await response.json();
      setNotices([newNotice, ...notices]);
      setSuccess('Notice created successfully');
      setHeading('');
      setDate('');
      setFile(null);
      document.getElementById('file').value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, fileLink) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        let fileId;
        if (fileLink.includes('drive.google.com')) {
          // Extract fileId from webContentLink if it's a full URL
          const fileIdMatch = fileLink.match(/\/d\/(.+?)\/view/);
          fileId = fileIdMatch ? fileIdMatch[1] : fileLink.split('/d/')[1].split('/view')[0];
        } else {
          // Assume fileLink is already the fileId
          fileId = fileLink;
        }
        await fetch(`${API_BASE_URL}/notices/proxy/delete/${fileId}`, {
          method: 'DELETE',
        });
        await fetch(`${API_BASE_URL}/notices/${id}`, {
          method: 'DELETE',
        });
        setNotices(notices.filter((notice) => notice._id !== id));
        setSuccess('Notice deleted successfully');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredNotices = notices.filter((notice) => {
    const dateMatch = !filterDate || new Date(notice.date).toISOString().split('T')[0] === filterDate;
    const headingMatch = !filterHeading || notice.heading.toLowerCase().includes(filterHeading.toLowerCase());
    return dateMatch && headingMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Manage Notices</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create Notice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="heading" className="block text-gray-700 font-medium mb-2">
              Notice Heading
            </label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date of Notice
            </label>

            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
              Upload PDF
            </label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded text-gray-800"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create Notice
        </button>
      </form>

      {/* Notices Table with Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Sticky Filter Section */}
        <div className="sticky top-0 z-10 bg-white pb-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Filter Notices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="filterDate" className="block text-gray-700 font-medium mb-2">
                Filter by Date
              </label>
              <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="filterHeading" className="block text-gray-700 font-medium mb-2">
                Filter by Heading
              </label>
              <input
                type="text"
                id="filterHeading"
                value={filterHeading}
                onChange={(e) => setFilterHeading(e.target.value)}
                placeholder="Enter heading keyword"
                className="w-full p-2 border rounded text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notices Table */}
        <h3 className="text-2xl font-semibold mb-4">Notices</h3>
        {filteredNotices.length === 0 ? (
          <p className="text-gray-600">No notices available or matching filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Heading</th>
                  <th className="px-4 py-2 text-left text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-gray-700">File</th>
                  <th className="px-4 py-2 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice) => (
                  <tr key={notice._id} className="border-t">
                    <td className="px-4 py-2">{notice.heading}</td>
                    <td className="px-4 py-2">{new Date(notice.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://drive.google.com/file/d/${notice.googleDriveLink}/view?usp=sharing`} // Use full Google Drive URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(notice._id, notice.googleDriveLink)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                      >
                        Delete
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

export default NoticeUpdate;