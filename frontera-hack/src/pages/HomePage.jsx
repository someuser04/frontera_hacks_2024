import React from "react";
import Post from "../components/post";

const HomePage = () => {
  return(
    <>
      <div className="flex ">
        {/* Sidebar */}
        <div className="bg-yellow-500 w-1/3 h-screen">

        </div>
        {/* Main Content */}
        <div className="bg-white w-2/3 h-screen flex justify-center">
          <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hidden">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
          </div>
        </div>
        {/* Trending or something */}
        <div className="bg-orange-500 w-1/3 h-screen">

        </div>
      </div>
    </>
  );
}

export default HomePage;