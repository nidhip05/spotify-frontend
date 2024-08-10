import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

const Player = ({
  song,
  className = "",
  onNext,
  onPrevious,
  backgroundColor,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [song]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {song && (
        <div
          className={`md:flex flex-col items-center justify-center text-white p-4 rounded-lg md:mx-0 mx-4 ${className}`}
        >
          <div>
            <div className="grid md:mb-8 mb-4 text-start">
              <div>
                <h4 className="md:text-4xl text-3xl font-semibold md:mb-4 mb-0.5">
                  {song?.name}
                </h4>
                <p className="text-sm text-gray-400">{song?.artist}</p>
              </div>
            </div>
            <div>
              <img
                src={`https://cms.samespace.com/assets/${song?.cover}`}
                alt={song?.name}
                className="rounded-lg md:w-[600px] md:h-[600px] w-full h-52"
              />
            </div>
            <div className="w-full md:mt-6 mt-4">
              <div
                className="relative h-[6px] rounded-full cursor-pointer"
                style={{
                  backgroundColor: backgroundColor,
                }}
                onClick={handleSeek}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <audio ref={audioRef} src={song?.url}></audio>
            <div className="flex items-center md:my-8 my-4 justify-between w-full">
              <div
                className="h-11 w-11 rounded-full flex items-center justify-center text-white"
                style={{
                  backgroundColor: backgroundColor,
                }}
              >
                <BsThreeDots className="text-xl" />
              </div>
              <div className="flex items-center justify-center gap-5">
                <FaBackward
                  className="cursor-pointer mr-4 text-2xl"
                  onClick={onPrevious}
                  style={{
                    color: backgroundColor,
                  }}
                />
                <div
                  onClick={togglePlayPause}
                  className="cursor-pointer flex items-center justify-center h-12 w-12 rounded-full bg-white text-black"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </div>
                <FaForward
                  className="cursor-pointer ml-4 text-2xl"
                  style={{
                    color: backgroundColor,
                  }}
                  onClick={onNext}
                />
              </div>
              <div
                className="h-11 w-11 rounded-full flex items-center justify-center text-white cursor-pointer"
                style={{
                  backgroundColor: backgroundColor,
                }}
                onClick={toggleMute}
              >
                {isMuted ? (
                  <HiMiniSpeakerXMark className="text-xl" />
                ) : (
                  <HiMiniSpeakerWave className="text-xl" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
