import { useState, useEffect } from 'react';
import collaborationBackground from '../assets/contribution-background.jpg';
import API_BASE_URL from '../config';

function Contributions() {
  const [contributionCounts, setContributionCounts] = useState({
    volunteers: 0,
    treesplanted: 0,
    specialcamps: 0,
    nssunits: 0,
  });

  // Fetch contribution data from the backend
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        console.log('Contributions: Fetching from /api/contributions');
        const response = await fetch(`${API_BASE_URL}/contributions`);
        const data = await response.json();
        console.log('Contributions: API Response:', data);
        if (data.success) {
          const counts = data.contributions.reduce((acc, item) => {
            acc[item.type.toLowerCase()] = item.count || 0;
            return acc;
          }, { volunteers: 0, treesplanted: 0, specialcamps: 0, nssunits: 0 });
          console.log('Contributions: Mapped Counts:', counts);
          setContributionCounts(counts);
        } else {
          console.error('Contributions: Failed to fetch data:', data.message);
        }
      } catch (error) {
        console.error('Contributions: Error fetching data:', error);
      }
    };

    fetchContributions();
  }, []);

  const contributionItems = [
    { type: 'volunteers', label: 'Volunteers', count: contributionCounts.volunteers },
    { type: 'treesplanted', label: 'Trees Planted', count: contributionCounts.treesplanted },
    { type: 'specialcamps', label: 'Special Camps', count: contributionCounts.specialcamps },
    { type: 'nssunits', label: 'NSS Units', count: contributionCounts.nssunits },
  ];

  const formatCount = (count) => {
    return count.toLocaleString();
  };

  return (
    <section
      className="py-10 px-4 sm:px-6 lg:px-8 text-center w-full relative bg-gray-900"
      style={{ backgroundImage: `url(${collaborationBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-gray-900 opacity-80 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white">Our Contributions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
          {contributionItems.map((item, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-blue-400">{formatCount(item.count)}</p>
              <p className="text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contributions;