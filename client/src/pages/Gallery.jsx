import { useEffect, useState } from 'react';
import API_BASE_URL from '../config';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch photos: ${response.status} ${errorText}`);
        }
        return await response.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await fetchWithRetry(`${API_BASE_URL}/photos`);
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
                src={`${API_BASE_URL}/photos/proxy/${photo.googleDriveLink}`}
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