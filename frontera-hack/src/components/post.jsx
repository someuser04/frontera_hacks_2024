import React from "react";

const Post = ({ post }) => {
  return (
    <>
      <div className="h-auto md:h-[500px] lg:h-[550px] w-full md:w-[600px] lg:w-[800px] bg-[#EBEBEB] my-6 p-4 md:p-6 lg:p-2 flex flex-col justify-between rounded-3xl">
        <div className="flex flex-col md:flex-row">
          <img 
            src={post.Pfp} 
            className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover mx-auto md:m-0 md:p-2" 
          />
          <div className="flex flex-col justify-center text-center md:text-left mt-4 md:mt-0 md:ml-4 lg:ml-0">
            <div className="text-xl font-semibold">{post.Author}</div>
            <div className="text-sm text-gray-500">{post.Location}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="p-2 text-center md:text-left">{post.DESCRIPTION}</div>
          <img 
            src={post.IMAGE} 
            className="w-full h-64 md:h-60 lg:h-72 rounded-2xl object-cover" 
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

export default Post;
