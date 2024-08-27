import React, { useState } from 'react';
import './App.css'
import './index.css';  // Import the CSS file here
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout'; // Import the Layout component
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthorDashboard from './pages/AuthorDashboard';
import BlogPosts from './pages/BlogPosts';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SearchResults from './pages/SearchResults';
import ChangePassword from './pages/ChangePassword'
import DeleteConfirm from './pages/DeleteConfirm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={isAuthenticated ? <AuthorDashboard /> : <Login handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} />} />
          <Route path="/blog" element={<BlogPosts />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create_post" element={isAuthenticated ? <CreatePost /> : <Login handleLogin={handleLogin} />} />
          <Route path="/edit_post/:id" element={isAuthenticated ? <EditPost /> : <Login handleLogin={handleLogin} />} />
          <Route path="/search" element={<SearchResults />} />
         <Route path="/change_password" element={<ChangePassword />}></Route>
         <Route path="/delete" element={<DeleteConfirm />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
