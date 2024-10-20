import Cookies from "js-cookie";
import Post from "../components/post";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchPost from "../components/searchPosts"; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const HomePage = () => {

  const navigate = useNavigate();
  const [id, setId] = useState();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  const checkPost = async (description) => {

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Given this description: ${description}, determine if it is inappropiate, if so return just the pharse true, otherwise false. Do not capitalize the words true or false.`;
      const result = await model.generateContent(prompt);
      const isInappropiate = result.response.text().trim().toLowerCase() === "true";
      return isInappropiate;
    } catch (error) {
      console.error("Error with Generative AI:", error);
    }
  };

  useEffect(() => {
    
    // Getting cookie/id
    const getCookie = () => Cookies.get("id");

    // fetching all posts kinda obvious but still
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // same here fetching profile
    const fetchProfile = async (userId) => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const userId = getCookie();
    setId(userId);
    fetchPosts();
    fetchProfile(userId);
  }, []);

  const handleLogout = () => {
    Cookies.remove("id");
    navigate("/");
  };

  const handlePost = async () => {
    if (!image || !description) return;
    const flag = await checkPost(description);
    if (flag) {
      console.log("Bad Post!");
      return;
    }
    const newPost = {
      author: user.USERNAME,
      location: user.LOCATION,
      description,
      image,
      email: user.EMAIL,
      pfp: user.PFP,
    };

    try {
      const response = await fetch("http://localhost:3000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      const updatedPostsResponse = await fetch("http://localhost:3000/posts");
      const updatedPosts = await updatedPostsResponse.json();
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  const handleSearch = async () => {
    if (!search) return;
    try {
      const response = await fetch(`http://localhost:3000/postSearch/${search}`);
      const temp = await response.json();
      setSearchedPosts(temp);
    } catch (e) {
      console.log("Error fetching searched posts:", e);
    }
  };

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="bg-yellow-500 w-1/4 h-screen flex flex-col items-center justify-center p-4">
        {/* Image Input */}
        <input
          type="url"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Description Input */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Post Button */}
        <button onClick={handlePost} className="bg-blue-500 w-24 h-10 rounded-full text-white">
          Post
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white w-2/4 h-screen flex flex-col items-center p-4">
        <div className="flex items-center justify-center pb-4">
          {/* Username */}
          <h1 className="text-2xl font-bold">Welcome, {user ? user.USERNAME : "Guest"}</h1>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="py-2 px-4 mx-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
        {/* List of all posts of like companies that post */}
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden w-full flex flex-col items-center">
          {posts.length > 0 ? posts.map((post, i) => <Post post={post} key={i} />) : <p>No posts available</p>}
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-orange-500 w-1/4 h-screen flex flex-col items-center justify-center">
        <div className="p-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="py-2 px-4 mx-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
          >
            Search
          </button>
        </div>
        {/* List of searched posts */}
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden w-full flex flex-col items-center">
          {searchedPosts.length > 0 ? searchedPosts.map((post, i) => <SearchPost post={post} key={i} />) : <p>Search for posts!</p>}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
