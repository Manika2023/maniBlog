import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');
  const [programming_language_tags, setProgramming_language_tags] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation after successful creation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, description, solution, programming_language_tags };

    try {
      const response = await fetch('http://localhost:8000/blog/author_create_post/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Post created successfully');
        setTitle('');
        setDescription('');
        setSolution('');
        setProgramming_language_tags('');
        // navigate('/dashboard'); // Redirect to home or another page after successful creation
      } else {
        setError(data.message || 'Failed to create post');
        setTitle('');
        setDescription('');
        setSolution('');
        setProgramming_language_tags('');
      }
    } catch (err) {
      setError('Failed to fetch');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-white font-bold mb-4">Create New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="block text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Solution</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Programming Language</label>
            <input
              type="text"
              value={programming_language_tags}
              onChange={(e) => setProgramming_language_tags(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Post +
            </button>
            <NavLink
              to={'/dashboard'}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
