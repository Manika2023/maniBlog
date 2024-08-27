import React, { useState } from 'react';
import {Link} from 'react-router-dom'
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirmation match
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    const passwordData = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await fetch('http://localhost:8000/accounts/change_password/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setError('');
      } else {
        // Display specific errors
        if (data.old_password) {
          setError(data.old_password[0]);
        } else if (data.new_password) {
          setError(data.new_password[0]);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          setError('Failed to change password.');
        }
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong.');
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-white font-bold mb-4">Change Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-400 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-900">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-300 text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-300 text-gray-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 bg-gray-300 text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
        <button className="bg-red-500 mx-3 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
  <Link to="/dashboard" className="text-white">
    Cancel
  </Link>
</button>
      </form>
    </div>
  );
};

export default ChangePassword;
