import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaUniversity,
  FaTags,
  FaUserTie,
  FaClipboardList,
  FaPhoneAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaFilter,
} from 'react-icons/fa';

function NSSUnitUpdate() {
  const [unitName, setUnitName] = useState('');
  const [category, setCategory] = useState('');
  const [programOfficer, setProgramOfficer] = useState('');
  const [eti, setEti] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [allotment, setAllotment] = useState('');
  const [district, setDistrict] = useState('');
  const [nssUnits, setNSSUnits] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterUnitName, setFilterUnitName] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');


  const navigate = useNavigate();

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser || storedUser.role !== 'admin') {
    navigate('/login');
    return;
  }
}, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!unitName || !category || !programOfficer || !mobileNo || !allotment || !district) {
      setError('All required fields must be filled');
      return;
    }

    const newNSSUnit = { unitName, category, programOfficer, eti, mobileNo, allotment, district };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/nss-units`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNSSUnit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create NSS unit');
      }

      const created = await response.json();
      setNSSUnits([created, ...nssUnits]);
      setSuccess('NSS unit created successfully');

      // Reset form
      setUnitName('');
      setCategory('');
      setProgramOfficer('');
      setEti('');
      setMobileNo('');
      setAllotment('');
      setDistrict('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this NSS unit?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/nss-units/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete NSS unit');
        setNSSUnits(nssUnits.filter((unit) => unit._id !== id));
        setSuccess('NSS unit deleted successfully');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredNSSUnits = nssUnits.filter((unit) => {
    const matchName = !filterUnitName || unit.unitName.toLowerCase().includes(filterUnitName.toLowerCase());
    const matchDistrict = !filterDistrict || unit.district.toLowerCase().includes(filterDistrict.toLowerCase());
    return matchName && matchDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Manage NSS Units</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Create NSS Unit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Unit Name *" value={unitName} onChange={setUnitName} placeholder="Enter unit name" icon={FaUniversity} />
          <InputField label="Category *" value={category} onChange={setCategory} placeholder="e.g., Rural, Urban" icon={FaTags} />
          <InputField label="Program Officer *" value={programOfficer} onChange={setProgramOfficer} placeholder="Enter program officer name" icon={FaUserTie} />
          <InputField label="ETI (Optional)" value={eti} onChange={setEti} placeholder="Enter ETI (if any)" icon={FaClipboardList} />
          <InputField label="Mobile No *" value={mobileNo} onChange={setMobileNo} placeholder="Enter mobile number" icon={FaPhoneAlt} />
          <InputField label="Allotment *" value={allotment} onChange={setAllotment} placeholder="e.g., number of volunteers" icon={FaUsers} />
          <InputField label="District *" value={district} onChange={setDistrict} placeholder="Enter district" icon={FaMapMarkerAlt} />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create NSS Unit
        </button>
      </form>

      {/* Table & Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Sticky Filter */}
        <div className="sticky top-0 bg-white z-10 pb-4 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <FaFilter className="text-blue-600" />
            Filter NSS Units
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Filter by Unit Name" value={filterUnitName} onChange={setFilterUnitName} placeholder="Enter unit name" icon={FaUniversity} />
            <InputField label="Filter by District" value={filterDistrict} onChange={setFilterDistrict} placeholder="Enter district" icon={FaMapMarkerAlt} />
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">NSS Units</h3>
        {filteredNSSUnits.length === 0 ? (
          <p className="text-gray-600">No NSS units available or matching filter</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  {['Serial No', 'Unit Name', 'Category', 'Program Officer', 'ETI', 'Mobile No', 'Allotment', 'District', 'Action'].map((col) => (
                    <th key={col} className="px-4 py-2 text-left text-gray-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredNSSUnits.map((unit, index) => (
                  <tr key={unit._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{unit.unitName}</td>
                    <td className="px-4 py-2">{unit.category}</td>
                    <td className="px-4 py-2">{unit.programOfficer}</td>
                    <td className="px-4 py-2">{unit.eti || 'N/A'}</td>
                    <td className="px-4 py-2">{unit.mobileNo}</td>
                    <td className="px-4 py-2">{unit.allotment}</td>
                    <td className="px-4 py-2">{unit.district}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(unit._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
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

// 🔹 Reusable InputField Component with Icon Support
function InputField({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
        {Icon && <Icon className="text-blue-600" />}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default NSSUnitUpdate;
