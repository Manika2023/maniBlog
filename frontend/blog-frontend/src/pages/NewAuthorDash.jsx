import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { useNavigate,NavLink } from 'react-router-dom';

const AuthorDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [message, setMessage] = useState('');
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
    try {
      navigate('/create_post');
    } catch {
      setMessage('Sorry! You cannot create a post, something went wrong.');
    }
  };

  const handleEditPost = (id) => {
    try {
      navigate(`/edit_post/${id}`);
    } catch {
      setMessage('Sorry! You cannot edit this post, something went wrong.');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:8000/blog/delete_post_author/${id}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          setError('Failed to delete post.');
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Something went wrong.');
      }
    }
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

          {message && <p className="text-green-500 mb-4">{message}</p>}

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
                      {/* <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button> */}
                    
                    <div className="bg-red-500 text-white px-4 py-2 rounded">
                      <NavLink to={'/delete'}>Delete</NavLink>
                    </div>
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
    </div>
  );
};

export default AuthorDashboard;
