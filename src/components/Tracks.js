import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import SongList from "./SongList";

const Tracks = ({
  activeTab,
  setActiveTab,
  filteredSongs,
  setSelectedSong,
  setSearchQuery,
  searchQuery,
  backgroundColor,
}) => {
  const [animateList, setAnimateList] = useState("");
  const [animateComponent, setAnimateComponent] = useState("");

  useEffect(() => {
    setAnimateComponent("slide-in-up");
    setAnimateList("fade-in-list");
  }, []);

  const handleTabSwitch = (tab) => {
    setAnimateList("fade-out-list");
    setTimeout(() => {
      setActiveTab(tab);
      setAnimateList("fade-in-list");
    }, 300);
  };

  return (
    <div className={`tracks-component ${animateComponent} md:mx-0 mx-6`}>
      <div className="py-7">
        <div className="flex items-center justify-start text-xl font-semibold">
          <div
            style={{
              color: activeTab === "forYou" ? "#fff" : backgroundColor,
            }}
            className={`mr-10 cursor-pointer`}
            onClick={() => handleTabSwitch("forYou")}
          >
            For You
          </div>
          <div
            className={`
        ${activeTab === "topTracks" ? "text-white" : "text-gray-500"}
         cursor-pointer`}
            style={{
              color: activeTab === "topTracks" ? "#fff" : backgroundColor,
            }}
            onClick={() => handleTabSwitch("topTracks")}
          >
            Top Tracks
          </div>
        </div>
        <div className="relative w-full mt-6">
          <input
            type="text"
            className="px-4 py-2 w-full rounded-md focus:outline-none text-base shadow-xl h-[50px] flex items-center text-white"
            style={{ backgroundColor: backgroundColor }}
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute top-3 right-4 text-2xl text-white" />
        </div>
      </div>
      <SongList
        songs={filteredSongs}
        onSongSelect={setSelectedSong}
        className={animateList}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default Tracks;
