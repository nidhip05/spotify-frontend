import { useEffect, useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import Player from "./components/Player";
import Tracks from "./components/Tracks";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState("forYou");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState({});
  const [data, setData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#140e04");
  const [animatePlayer, setAnimatePlayer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const songs =
    activeTab === "forYou"
      ? data.filter((song) => !song.top_track)
      : data.filter((song) => song.top_track);
  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lightenColor = (color, percent) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };
  const lightenedBackgroundColor = lightenColor(backgroundColor, 0.3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://cms.samespace.com/items/songs";
        const res = await axios.get(url);
        if (res?.data) {
          const songs = res?.data?.data || [];
          const topTrackSong = songs.find((item) => !item.top_track);
          if (topTrackSong) {
            setSelectedSong(topTrackSong);
            setBackgroundColor(topTrackSong.accent || "#140e04");
          } else {
            setSelectedSong(songs[0]);
            setBackgroundColor(songs[0]?.accent || "#140e04");
          }
          setData(songs);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setBackgroundColor(song.accent || "#140e04");
    setAnimatePlayer(true);
    setTimeout(() => setAnimatePlayer(false), 800);
  };

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.name === selectedSong?.name
    );
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    handleSongSelect(filteredSongs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.name === selectedSong?.name
    );
    const prevIndex =
      (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    handleSongSelect(filteredSongs[prevIndex]);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:grid md:grid-cols-[0.3fr,0.5fr,1fr] md:gap-12 overflow-x-hidden overflow-y-hidden"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <LeftSidebar
        className="hidden md:block slide-in-left"
        toggleMenu={toggleMenu}
      />
      <div className={`w-full ${isMenuOpen ? "block" : "hidden"} md:block`}>
        <Tracks
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          filteredSongs={filteredSongs}
          setSelectedSong={handleSongSelect}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          className="fade-in"
          backgroundColor={lightenedBackgroundColor}
        />
      </div>
      {selectedSong && (
        <Player
          song={selectedSong}
          className={`${animatePlayer ? "fade-in-up" : ""}`}
          onNext={handleNext}
          onPrevious={handlePrevious}
          toggleMenu={toggleMenu}
          backgroundColor={lightenedBackgroundColor}
        />
      )}
    </div>
  );
}

export default App;
