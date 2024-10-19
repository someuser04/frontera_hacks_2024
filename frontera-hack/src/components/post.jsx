import React from "react";

const Post = () => {
  return(
    <>
      <div className="h-[550px] w-[800px] bg-[#EBEBEB] my-6 p-2 flex flex-col justify-between rounded-3xl">
        <div className="flex">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPaVCOvLe_WzdWTmekiVBJ-1obJ009XmKzsw&s" className="w-24 h-24 rounded-full p-2" />
          <div className="flex flex-col justify-center">
            <div>John Doe</div>
            <div>1201 W University Dr, Edinburg, TX 78539</div>
          </div>
        </div>
        <div>
          <div className="p-2">UTRGV is offering web design services! Contact us to not only give students experience but receive a well polished website!</div>
          <img src="https://cdnb.artstation.com/p/assets/images/images/058/575/057/large/emily-guerra-web-live.jpg?1674494044" className="w-full h-72 rounded-2xl" />
        </div>
        <div className="flex items-center justify-center">
          <button className="w-36 h-12 bg-yellow-500 m-2 rounded-full"><a href="mailto:gaelguzman.dev@gmail.com" >Send Email</a></button>
        </div>
      </div>
    </>
  );
}

export default Post;