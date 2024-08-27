import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch blog posts from the API
    fetch("http://localhost:8000/blog/home/")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      {/* Static Hero Section */}
      <div
        className="bg-cover bg-center h-96 mb-10 rounded-lg"
        style={{ backgroundImage: `url('/images/hero-image.png')` }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Our Blog</h1>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Posts</h2>
        <div className="grid  gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <h5 className="text-orange-500">Error Description:</h5>
                <p className="text-gray-700">{post.description}</p>
                <h5 className="text-orange-500">Error Solution:</h5>

                <pre className="text-gray-800 bg-gray-100 p-6 rounded-lg font-playfair text-base leading-loose overflow-x-auto shadow-sm border border-gray-300">
                  {post.solution}
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
          ))}
        </div>
      </div>

      {/* Static Section */}
      <div className="bg-blue-500 text-white p-10 mt-10 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-4">Join our Community</h3>
        <p className="text-lg">
          Stay updated with the latest posts, news, and events. Sign up for our
          newsletter today!
        </p>
        <button className="mt-4 bg-white text-blue-500 font-bold px-6 py-2 rounded-full">
  <NavLink to="/register" className="block">
    Subscribe Now
  </NavLink>
  </button>
      </div>
    </div>
  );
};

export default Home;
