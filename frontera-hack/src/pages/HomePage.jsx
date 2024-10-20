import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/post";
import Cookies from "js-cookie";
import SearchPost from "../components/searchPosts";

const HomePage = () => {

  const navigate = useNavigate();
  const [id, setId] = useState();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    const getCookie = () => {
      return Cookies.get("id");
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchProfile = async (userId) => {
      if (!userId) return; // Don't fetch profile if userId is not available
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error Fetching Users: ", error);
      }
    };

    const userId = getCookie();
    setId(userId); // Set the user ID
    fetchPosts(); // Fetch posts
    fetchProfile(userId); // Fetch profile after userId is set

  }, []); // No dependencies means this runs once when the component mounts

  const handleLogout = () => {
    Cookies.remove("id");
    navigate("/"); // Redirect to login or landing page
  };

  const handlePost = async () => {
    if (!image || !description) {
      return;
    }
    const newPost = {
      author: user.USERNAME, 
      location: user.LOCATION, 
      description, 
      image,
      email: user.EMAIL, 
      pfp: user.PFP
    }
    try {
      const response = await fetch("http://localhost:3000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
      });
      if (!response.ok) {
        console.log("Error creating post!")
      }
      setImage("");
      setDescription("");
      const updatedPostsResponse = await fetch("http://localhost:3000/posts");
      const updatedPosts = await updatedPostsResponse.json();
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  }

  const handleSearch = async () => {
    if (!search) {
      return;
    }
    try {
      setSearchedPosts([]);
      const response = await fetch (`http://localhost:3000/postSearch/${search}`);
      const temp = await response.json();
      setSearchedPosts(temp);
      console.log(searchedPosts);
    } catch (e) {
      console.log("Error Fetching Searched Posts!: ", e);
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-yellow-500 w-1/4 h-screen flex flex-col items-center justify-center p-4">
        <input
            type="url"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handlePost} className="bg-blue-500 w-24 h-10 rounded-full text-white" >Post</button>
      </div>
      
      {/* Main Content */}
      <div className="bg-white w-2/4 h-screen flex flex-col items-center p-4">
        <div className="flex items-center justify-center pb-4">
          <h1 className="text-2xl font-bold">Welcome, {user ? user.USERNAME : 'Guest'}</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 mx-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden w-full flex flex-col items-center">
          {posts.length > 0 ? (
            posts.map((post, i) => <Post post={post} key={i} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      
      {/* Trending Section */}
      <div className="bg-orange-500 w-1/4 h-screen flex flex-col items-center justify-center">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSearch} className="py-2 px-4 mx-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300" >
            Search
          </button>
        </div>
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden w-full flex flex-col items-center">
          {searchedPosts.length > 0 ? (
            searchedPosts.map((post, i) => <SearchPost post={post} key={i} />)
          ) : (
            <p>Search for posts!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
