import React, { useState, useEffect } from "react";
import Post from "../components/post";
import Cookies from "js-cookie";

const HomePage = () => {
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

  return (
    <>
      <div className="flex ">
        {/* Sidebar */}
        <div className="bg-yellow-500 w-1/3 h-screen"></div>
        {/* Main Content */}
        <div className="bg-white w-2/3 h-screen flex justify-center">
          <h1 className="fixed">{id}</h1>
          <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <Post post={post} key={i} />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
        {/* Trending or something */}
        <div className="bg-orange-500 w-1/3 h-screen"></div>
      </div>
    </>
  );
};

export default HomePage;
