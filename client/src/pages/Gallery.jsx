import { useEffect, useState } from 'react';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';
    const fetchPhotos = async () => {
      try {
        
        const response = await fetch(`${API_BASE_URL}/photos`);
        if (!response.ok) throw new Error('Failed to fetch photos');
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Gallery</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {photos.length === 0 && !error && <p className="text-gray-600 text-center">No photos available</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={`${import.meta.env.VITE_API_URL}/photos/proxy/${photo.googleDriveLink}`}
                alt={photo.title}
                className="w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                onError={(e) => {
                  console.error(`Image load failed for ${photo.googleDriveLink}:`, e);
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(photo.title)}`;
                }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2 px-4">{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
