import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { NavLink } from 'react-router-dom';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  // Function to fetch posts
  const fetchPosts = (url = 'http://localhost:8000/blog/blog_posts/') => {
    setLoading(true);
    fetch(url)
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

  useEffect(() => {
    fetchPosts(); // Initial fetch
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Blog Posts</h2>

      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              
                  <div className="p-4">
                  <h5 className="text-orange-500">Error Title:</h5>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <h5 className="text-orange-500">Error Description:</h5>
                <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
                <h5 className="text-orange-500">Error Solution:</h5>

                <pre className="text-gray-800 bg-gray-100 p-6 rounded-lg font-playfair text-base leading-loose overflow-x-auto shadow-sm border border-gray-300">
                  {post.solution.slice(0,100)}...
                </pre>
                <p className="">
                  {format(new Date(post.created_at), "dd/MM/yy")}
                </p>

                <p className="">{post.programming_language_tags}</p>
                <a
                  href={`/post/${post.id}`}
                  className="text-blue-500 hover:underline mt-4 inline-block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>


      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between">
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
  );
};

export default BlogPosts;
