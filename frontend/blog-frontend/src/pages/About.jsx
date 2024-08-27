import React from 'react';
import { NavLink } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 h-screen">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">Welcome to MyBlog</h1>
      <p className="text-lg text-gray-100 mb-4">
        At MyBlog, we believe in the power of collaboration and shared knowledge. This platform is designed for coders and developers who face challenges while working on projects. Here, you can share your error solutions and help others overcome similar problems.
      </p>
      <p className="text-lg text-gray-100 mb-6">
        Whether you're a beginner or an experienced developer, your contributions can make a difference. Sign up today to start posting your error solutions and be part of a supportive community!
      </p>
      <NavLink to="/register">
        <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-full hover:bg-orange-600">
          Sign Up Now
        </button>
      </NavLink>
    </div>
  );
}
