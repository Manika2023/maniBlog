import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch('http://localhost:8000/accounts/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEditProfile(data); // Keep the edit form synced with the fetched data
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile data');
      });
  };

  const handleProfileUpdate = () => {
    const formData = new FormData();
    formData.append('bio', editProfile.bio || '');
    formData.append('location', editProfile.location || '');

    fetch('http://localhost:8000/accounts/profile/', {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => setError(''), 5000);
        } else {
          setMessage('Profile updated successfully');
          setTimeout(() => setMessage(''), 5000);
          fetchProfile(); // Refresh the profile data
          setIsEditing(false);
        }
      })
      .catch(err => {
        console.error('Error updating profile:', err);
        setError('Failed to update profile');
      });
  };

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  return (
    <div className='min-h-screen bg-gray-800 p-2'>
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile</h2>

          {message && <p className="text-green-500 text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {!isEditing ? (
            <div className="text-center">
              <div className="relative inline-block">
                {/* <img
                  src={profile.profile_picture_url || 'https://www.gravatar.com/avatar?d=mp'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                /> */}
              
              <img
            src="/images/Avatar.png"
            alt="Avatar"
            className="rounded-full w-24 h-24 border-2 border-green-500"
          />
        
              </div>

              <p className="text-xl font-semibold"><strong>Username:</strong> {profile.user?.username}</p>
              <p className="text-xl font-semibold"><strong>Email:</strong> {profile.user?.email}</p>
              <p className="text-xl font-semibold"><strong>Bio:</strong> {profile.bio}</p>
              <p className="text-xl font-semibold"><strong>Location:</strong> {profile.location}</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
              >
                Edit Profile
              </button>
              <button
        onClick={handleChangePassword}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-6"
      >
        Change Password
      </button>

            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Bio (optional):</label>
                <textarea
                  value={editProfile.bio || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                  className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location (optional):</label>
                <input
                  type="text"
                  value={editProfile.location || ''}
                  onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                  className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded w-full mr-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
