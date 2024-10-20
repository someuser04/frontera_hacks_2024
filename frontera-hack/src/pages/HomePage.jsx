import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/post";
import Cookies from "js-cookie";

const HomePage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getCookie = () => {
      return Cookies.get("id");
    };
    setId(getCookie());

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    Cookies.remove("id");
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-yellow-500 w-1/4 h-screen flex flex-col items-center p-4">
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
        >
          Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="bg-white w-2/4 h-screen flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {id}</h1>
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden w-full">
          {posts.length > 0 ? (
            posts.map((post, i) => <Post post={post} key={i} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      
      {/* Trending Section */}
      <div className="bg-orange-500 w-1/4 h-screen"></div>
    </div>
  );
};

export default HomePage;
