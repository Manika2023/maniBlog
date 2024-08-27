import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from './DeleteConfirm';

const AuthorDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // New state for alert type
  const [postIdToDelete, setPostIdToDelete] = useState(null); // State for delete confirmation
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts initially
    fetchPosts();
  }, []);

  const fetchPosts = (url = 'http://localhost:8000/blog/author_dashboard/') => {
    setLoading(true);
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts.');
        setLoading(false);
      });
  };

  const handleCreatePost = () => {
    navigate('/create_post');
  };

  const handleEditPost = (id) => {
    navigate(`/edit_post/${id}`);
  };

  const confirmDeletePost = (id) => {
    setPostIdToDelete(id);
  };

  const handleDeleteConfirmed = (message, type) => {
    // Update the posts and show a success message
    setPosts(posts.filter((post) => post.id !== postIdToDelete));
    setMessage(message);
    setAlertType(type);

    // Hide the alert after 5 seconds
    setTimeout(() => {
      setMessage('');
      setAlertType('');
    }, 8000);

    // Close the delete modal
    setPostIdToDelete(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      {/* Profile section */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4 mb-6 lg:mb-0">
          <Profile />
        </div>

        {/* Posts section */}
        <div className="lg:col-span-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Blog Posts</h2>

          {/* Display success/error alert */}
          {message && (
            <div
              className={`alert ${
                alertType === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white px-4 py-2 rounded mb-4`}
            >
              {message}
            </div>
          )}

          {/* Create Post Button */}
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6 block sm:inline-block"
          >
            Create New Post +
          </button>

          <div className="grid gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4">
                    <h5 className="text-orange-500">Error Title: </h5>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <h5 className="text-orange-500">Error Description: </h5>
                    <p className="text-gray-900">{post.description.slice(0, 100)}...</p>
                    <h5 className="text-orange-500">Error Solution: </h5>
                    <p className="text-gray-700">{post.solution.slice(0, 100)}...</p>
                    <a href={`/post/${post.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
                      Read More
                    </a>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {/* Edit Post Button */}
                      <button
                        onClick={() => handleEditPost(post.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      {/* Delete Post Button */}
                      <button
                        onClick={() => confirmDeletePost(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-between flex-wrap gap-2">
            {prevPage && (
              <button
                onClick={() => fetchPosts(prevPage)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                &larr; Previous
              </button>
            )}
            {nextPage && (
              <button
                onClick={() => fetchPosts(nextPage)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postIdToDelete && (
        <DeleteConfirm
          postId={postIdToDelete}
          onDeleteConfirmed={handleDeleteConfirmed}
          onCancel={() => setPostIdToDelete(null)}
        />
      )}
    </div>
  );
};

export default AuthorDashboard;
