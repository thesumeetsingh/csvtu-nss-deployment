import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTree, FaCampground, FaUniversity } from 'react-icons/fa'; // Import icons

function ContributionsUpdate() {
  const [contributions, setContributions] = useState({
    volunteers: 0,
    treesplanted: 0,
    specialcamps: 0,
    nssunits: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchContributions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contributions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          const cont = data.contributions.reduce((acc, item) => {
            acc[item.type] = item.count;
            return acc;
          }, {});
          setContributions((prev) => ({ ...prev, ...cont }));
        } else {
          setError('Failed to fetch contributions data');
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchContributions();
  }, [navigate]);

  const handleUpdate = async (type) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contributions/${type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ count: contributions[type] }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(`${type.replace(/([A-Z])/g, ' $1')} updated successfully`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to update');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleSaveAll = async () => {
    for (const type of Object.keys(contributions)) {
      await handleUpdate(type);
    }
  };

  const iconMap = {
    volunteers: <FaUsers className="inline-block mr-2 text-blue-600" />,
    treesplanted: <FaTree className="inline-block mr-2 text-green-700" />,
    specialcamps: <FaCampground className="inline-block mr-2 text-yellow-600" />,
    nssunits: <FaUniversity className="inline-block mr-2 text-purple-600" />,
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Update Contributions
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(contributions).map((type) => (
            <div key={type} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <label className="block text-gray-800 font-semibold capitalize mb-2">
                {iconMap[type]}
                {type.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="number"
                value={contributions[type]}
                onChange={(e) =>
                  setContributions({
                    ...contributions,
                    [type]: parseInt(e.target.value) || 0,
                  })
                }
                placeholder={`Enter ${type.replace(/([A-Z])/g, ' $1')} count`}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-500 bg-transparent"
              />
              <button
                onClick={() => handleUpdate(type)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Update {type.replace(/([A-Z])/g, ' $1')}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAll}
          className="mt-8 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Save All
        </button>
      </div>
    </div>
  );
}

export default ContributionsUpdate;
