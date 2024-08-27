import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');
  const [programming_language_tags, setProgramming_language_tags] = useState('');
  const [error, setError] = useState('');
  const[message,setMessage]=useState("")
  const navigate = useNavigate(); // For navigation after successful update

  useEffect(() => {
    // Fetch post data if editing
    fetch(`http://localhost:8000/blog/author_edit_post/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setSolution(data.solution);
        setProgramming_language_tags(data.programming_language_tags);
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError('Failed to load post.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, description, solution, programming_language_tags };

    try {
      const response = await fetch(`http://localhost:8000/blog/author_edit_post/${id}/`, {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || ' Post Edited successfully');
        setTitle('');
        setDescription('');
        setSolution('');
        setProgramming_language_tags('');
        // navigate('/dashboard', { state: { message: 'Post updated successfully!' } }); // Redirect after successful update
        // navigate('/dashboard'); // Redirect after successful update
      } else {
        setError(data.message || 'Failed to update post');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-gray-100 font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && (
  <p className="text-green-500 mb-4">
    {message} 
    <Link to="/dashboard" className="underline text-orange-500 ml-2">
      Go Back to Dashboard
    </Link>
  </p>
)}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
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
        <button className="bg-red-500 mx-3 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
  <Link to="/dashboard" className="text-white">
    Cancel
  </Link>
</button>


        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Post
        </button>
       
      </form>
    </div>
  );
};

export default EditPost;
