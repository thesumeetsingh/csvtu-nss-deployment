import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa';

const platformIcons = {
  instagram: <FaInstagram className="text-pink-500 text-2xl" />,
  youtube: <FaYoutube className="text-red-600 text-2xl" />,
  twitter: <FaTwitter className="text-blue-400 text-2xl" />,
  facebook: <FaFacebook className="text-blue-600 text-2xl" />,
};

function SocialMediaUpdate() {
  const [socialMedia, setSocialMedia] = useState({
    instagram: 0,
    youtube: 0,
    twitter: 0,
    facebook: 0,
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

    const fetchSocialMedia = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/social-media`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          const sm = data.socialMedia.reduce((acc, item) => {
            acc[item.platform] = item.followerCount;
            return acc;
          }, {});
          setSocialMedia((prev) => ({ ...prev, ...sm }));
        } else {
          setError('Failed to fetch social media data');
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchSocialMedia();
  }, [navigate]);

  const handleUpdate = async (platform) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/social-media/${platform}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ followerCount: socialMedia[platform] }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(`${platform} updated successfully`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to update');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleSaveAll = async () => {
    for (const platform of Object.keys(socialMedia)) {
      await handleUpdate(platform);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Update Social Media Followers</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.keys(socialMedia).map((platform) => (
            <div key={platform} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                {platformIcons[platform]}
                <h3 className="text-xl font-semibold capitalize text-gray-800">{platform}</h3>
              </div>
              <input
                type="number"
                value={socialMedia[platform]}
                onChange={(e) =>
                  setSocialMedia({ ...socialMedia, [platform]: parseInt(e.target.value) || 0 })
                }
                placeholder={`Enter ${platform} followers`}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 placeholder-gray-500 bg-transparent"
              />
              <button
                onClick={() => handleUpdate(platform)}
                className="mt-3 bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700 transition"
              >
                Update {platform}
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

export default SocialMediaUpdate;
