import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";


const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      console.log(data);  // Log the response data to check the structure
      
      if (response.ok && data.token) {  // Check if token exists
        localStorage.setItem("token", data.token);
        setMessage(data.message || "Login successfully");
        setUsername("");
        setPassword("");
        handleLogin(); // Update authentication state
        // navigate('/dashboard')


        // Set a timeout to clear the success message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000)

      } else {
        setError(data.message || "Login failed");
        setUsername("");
        setPassword("");

        // Set a timeout to clear the success message after 3 seconds
        setTimeout(() => {
          setError("");
        }, 4000)

      }
    } catch (err) {
      setError("Something wenting wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-800 flex  flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white my-5 shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-2">
          <img
            src="/images/Avatar.png"
            alt="Avatar"
            className="rounded-full w-24 h-24 border-2 border-green-500"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-2">

        <span>If you have not an account </span>
        <NavLink to={"/register"}
        className={'text-green-600 font-bold'}
        > Sign up </NavLink>
        <span>Please!</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
