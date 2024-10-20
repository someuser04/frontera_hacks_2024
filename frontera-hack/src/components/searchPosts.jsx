import React from "react";

const SearchPost = ({ post }) => {
  return (
    <>
      <div className="h-auto w-[90%] bg-[#EBEBEB] p-4 m-2 flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col">
          <img 
            src={post.Pfp} 
            className="w-24 h-24 rounded-full object-cover mx-auto p-2" 
          />
          <div className="flex flex-col justify-center text-center mt-4">
            <div className="text-xl font-semibold">{post.Author}</div>
            <div className="text-sm text-gray-500">{post.Location}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="p-2 text-center">{post.DESCRIPTION}</div>
          <img 
            src={post.IMAGE} 
            className="w-full h-64 rounded-2xl object-cover" 
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="w-40 h-12 bg-yellow-500 m-2 rounded-full">
            <a href={`mailto:${post.Email}`}>Send Email</a>
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchPost;
