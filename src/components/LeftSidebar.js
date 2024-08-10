import React from "react";
import { AiFillSpotify } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const LeftSidebar = ({ toggleMenu }) => {
  return (
    <div className="left-sidebar p-6 relative">
      <div className="flex items-center gap-1">
        <AiFillSpotify className="text-4xl text-white" />
        <p className="text-white font-semibold text-2xl">Spotify</p>
      </div>
      <div className="w-full flex justify-end items-center md:hidden mb-4 right-5 absolute top-8 text-white">
        <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>
      <div className="absolute bottom-5 left-7 md:block hidden">
        <img
          src="https://images.pexels.com/photos/4924538/pexels-photo-4924538.jpeg"
          className="h-12 w-12 rounded-full border border-gray-700 object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
