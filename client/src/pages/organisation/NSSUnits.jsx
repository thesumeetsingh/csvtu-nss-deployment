import { useState, useEffect } from 'react';

function NSSUnits() {
  const [nssUnits, setNSSUnits] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNSSUnits = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/nss-units`);
        if (!response.ok) throw new Error('Failed to fetch NSS units');
        const data = await response.json();
        setNSSUnits(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNSSUnits();
  }, []);

  const totalUnits = nssUnits.length;
  const totalVolunteers = nssUnits.reduce((sum, unit) => {
    const allotmentNum = parseInt(unit.allotment, 10) || 0;
    return sum + allotmentNum;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold mb-6">NSS Units</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {nssUnits.length === 0 ? (
        <p className="text-gray-600">No NSS units available</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Serial No</th>
                  <th className="px-4 py-2 text-left text-gray-700">Unit Name</th>
                  <th className="px-4 py-2 text-left text-gray-700">Category</th>
                  <th className="px-4 py-2 text-left text-gray-700">Program Officer</th>
                  <th className="px-4 py-2 text-left text-gray-700">ETI</th>
                  <th className="px-4 py-2 text-left text-gray-700">Mobile No</th>
                  <th className="px-4 py-2 text-left text-gray-700">Allotment</th>
                  <th className="px-4 py-2 text-left text-gray-700">District</th>
                </tr>
              </thead>
              <tbody>
                {nssUnits.map((unit, index) => (
                  <tr key={unit._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{unit.unitName}</td>
                    <td className="px-4 py-2">{unit.category}</td>
                    <td className="px-4 py-2">{unit.programOfficer}</td>
                    <td className="px-4 py-2">{unit.eti || 'N/A'}</td>
                    <td className="px-4 py-2">{unit.mobileNo}</td>
                    <td className="px-4 py-2">{unit.allotment}</td>
                    <td className="px-4 py-2">{unit.district}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-gray-700">
            <p>Total Units: {totalUnits}</p>
            <p>Total Volunteers: {totalVolunteers}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NSSUnits;