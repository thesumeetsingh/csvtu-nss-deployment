import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPhoto() {
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://csvtu-nss-deployment.onrender.com/api';

  const navigate = useNavigate();

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser || storedUser.role !== 'admin') {
    navigate('/login');
    return;
  }
}, [navigate]);

  // Fetch photos
  useEffect(() => {
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

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', e.target.photo.files[0]);
    formData.append('title', title);

    try {
      const response = await fetch(`${API_BASE_URL}/photos/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setSuccess('Photo uploaded successfully');
      setTitle('');
      e.target.photo.value = ''; // Reset file input
      fetchPhotos(); // Refresh photo list
    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
    }
  };

  // Handle delete
  const handleDelete = async (photoId, fileId) => {
    try {
      // Delete from Google Drive
      await fetch(`${API_BASE_URL}/photos/proxy/delete/${fileId}`, {
        method: 'DELETE',
      });

      // Delete from MongoDB
      await fetch(`${API_BASE_URL}/photos/${photoId}`, {
        method: 'DELETE',
      });

      setPhotos(photos.filter(photo => photo._id !== photoId));
      setSuccess('Photo deleted successfully');
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#F3F4F6] text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Upload Photo</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleUpload} className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Uploaded Photos</h3>
      {photos.length === 0 && !error && <p className="text-gray-600">No photos uploaded yet</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={`${API_BASE_URL}/photos/proxy/${photo.googleDriveLink}`}
              alt={photo.title}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                console.error(`Image load failed for ${photo.googleDriveLink}:`, e);
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(photo.title)}`;
              }}
            />
            <h4 className="text-lg font-semibold text-gray-800 mt-2">{photo.title}</h4>
            <button
              onClick={() => handleDelete(photo._id, photo.googleDriveLink)}
              className="mt-2 w-full bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadPhoto;