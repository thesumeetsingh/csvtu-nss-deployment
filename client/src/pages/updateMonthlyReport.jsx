import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateMonthlyReport() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'admin') {
      navigate('/login');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/monthly-reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!month || !year || !file) {
      setError('All fields are required');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('month', month);
    formData.append('year', year);
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/monthly-reports`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create report');
      const newReport = await response.json();
      setReports([newReport, ...reports]);
      setSuccess('Report created successfully');
      setMonth('');
      setYear('');
      setFile(null);
      document.getElementById('file').value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, fileLink) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        let fileId;
        if (fileLink.includes('drive.google.com')) {
          const fileIdMatch = fileLink.match(/\/d\/(.+?)\/view/);
          fileId = fileIdMatch ? fileIdMatch[1] : fileLink.split('/d/')[1].split('/view')[0];
        } else {
          fileId = fileLink;
        }
        await fetch(`${import.meta.env.VITE_API_URL}/monthly-reports/proxy/${fileId}`, {
          method: 'GET',
        });
        await fetch(`${import.meta.env.VITE_API_URL}/monthly-reports/${id}`, {
          method: 'DELETE',
        });
        setReports(reports.filter((report) => report._id !== id));
        setSuccess('Report deleted successfully');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredReports = reports.filter((report) => {
    const monthMatch = !filterMonth || report.month === filterMonth;
    const yearMatch = !filterYear || report.year.toString() === filterYear;
    return monthMatch && yearMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Upload Monthly Report</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="month" className="block text-gray-700 font-medium mb-2">Select Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Select Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Upload PDF</label>
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
          Upload Report
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="sticky top-0 z-10 bg-white pb-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Filter Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="filterMonth" className="block text-gray-700 font-medium mb-2">Filter by Month</label>
              <select
                id="filterMonth"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Months</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label htmlFor="filterYear" className="block text-gray-700 font-medium mb-2">Filter by Year</label>
              <select
                id="filterYear"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Previous Reports</h3>
        {filteredReports.length === 0 ? (
          <p className="text-gray-600">No reports available or matching filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-gray-700">Month</th>
                  <th className="px-4 py-2 text-left text-gray-700">Year</th>
                  <th className="px-4 py-2 text-left text-gray-700">Uploaded At</th>
                  <th className="px-4 py-2 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report._id} className="border-t">
                    <td className="px-4 py-2">{report.title}</td>
                    <td className="px-4 py-2">{report.month}</td>
                    <td className="px-4 py-2">{report.year}</td>
                    <td className="px-4 py-2">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`https://drive.google.com/file/d/${report.googleDriveLink}/view?usp=sharing`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mr-2"
                      >
                        View PDF
                      </a>
                      <button
                        onClick={() => handleDelete(report._id, report.googleDriveLink)}
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

export default UpdateMonthlyReport;