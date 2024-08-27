import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from "date-fns";
import { NavLink } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/blog/blog_posts/${id}/`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => setError('Page not found'));
  }, [id]);

  if (error) {
    return <div className="container mx-auto p-4 text-white">{error}</div>;
  }

  return (
    <div className="h-screen">

   
    <div className="container mx-auto p-4  bg-gray-700 shadow-2xl mt-4 text-white">
      {post ? (
         <div className="p-4">
         <h5 className="text-orange-500">Error Title:</h5>
         <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
         <h5 className="text-orange-500">Error Description:</h5>
         <p className="text-gray-100">{post.description}</p>
         <h5 className="text-orange-500">Error Solution:</h5>

         <pre className="text-gray-800 bg-gray-100 p-6 rounded-lg font-playfair text-base leading-loose overflow-x-auto shadow-sm border border-gray-300">
           {post.solution}
         </pre>
         <p className="mt-4 text-gray-100"><span className="">Posted On- </span>
           {format(new Date(post.created_at), "dd/MM/yy")}
         </p>

         <p className="">{post.programming_language_tags}</p>
  
       </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default PostDetail;
