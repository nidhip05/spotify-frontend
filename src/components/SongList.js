import React from "react";

const SongList = ({ songs, onSongSelect, className, backgroundColor }) => {
  return (
    <>
      <style jsx>{`
        li:hover {
          background-color: ${backgroundColor};
          opacity: 0.8;
        }
      `}</style>
      <ul className={className}>
        {songs &&
          songs.map((song) => (
            <li
              key={song.id}
              className="p-2 rounded cursor-pointer text-white grid grid-cols-[50px,1fr,30px] gap-5 mb-6"
              onClick={() => onSongSelect(song)}
            >
              <div className="relative z-10">
                <img
                  src={`https://cms.samespace.com/assets/${song?.cover}`}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div className="relative z-10 grid">
                <span className="text-white">{song.name}</span>
                <span style={{ color: "#c3c3c3" }}>{song.artist}</span>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SongList;
