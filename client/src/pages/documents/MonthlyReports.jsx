import { useEffect, useState } from "react";

function MonthlyReport() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState({ month: '', year: '' });
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/monthly-reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        const data = await response.json();
        setReports(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchReports();
  }, []);

  const handleViewPdf = (fileId) => {
    const pdfUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    window.open(pdfUrl, '_blank');
  };

  const filteredReports = reports.filter((report) => {
    const monthMatch = !filter.month || report.month === filter.month;
    const yearMatch = !filter.year || report.year.toString() === filter.year;
    return monthMatch && yearMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl text-blue-800 text-center font-bold mb-6">Monthly Reports</h2>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Filter Reports</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="filterMonth" className="block text-gray-700 font-medium mb-2">Filter by Month</label>
            <select
              id="filterMonth"
              value={filter.month}
              onChange={(e) => setFilter({ ...filter, month: e.target.value })}
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
          <div className="flex-1">
            <label htmlFor="filterYear" className="block text-gray-700 font-medium mb-2">Filter by Year</label>
            <select
              id="filterYear"
              value={filter.year}
              onChange={(e) => setFilter({ ...filter, year: e.target.value })}
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        {filteredReports.length === 0 ? (
          <p className="text-gray-600">No reports available or matching filter</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report._id} className="border-t">
                    <td className="px-4 py-2">{report.title}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleViewPdf(report.googleDriveLink)}
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

export default MonthlyReport;