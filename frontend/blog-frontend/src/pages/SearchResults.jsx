import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { NavLink } from 'react-router-dom';

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('title');

  useEffect(() => {
    if (query) {
      // search?title=django - this url will create by below url
      fetch(`http://localhost:8000/blog/search/?title=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching search results:', err);
          setError('Failed to load search results.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-white font-bold mb-4">Search Results</h2>
      <div className="grid gap-6">
     
        {posts.length > 0 ? (
          
          posts.map((post) => (
            
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
             
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
          ))
        ) : (
          <p className='text-white'>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
