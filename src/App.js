import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePages from './Pages/HomePages';
import InstagramDashboardPages from './Pages/InstagramDashboardPages';
import SpotifyArtistsDashboardPages from './Pages/SpotifyArtistsDashboardPages';
import SpotifyPlaylistDashboardPages from './Pages/SpotifyPlaylistDashboardPages';
import SpotifyInstagramLinkDashboardPages from './Pages/SpotifyInstagramLinkDashboardPages';
import SoundCloudDashboardPages from './Pages/SoundCloudDashboardPages';
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/instagram-dashboard" element={<InstagramDashboardPages />} />
        <Route path="/spotify-artists-dashboard" element={<SpotifyArtistsDashboardPages />} />
        <Route path="/spotify-playlist-dashboard" element={<SpotifyPlaylistDashboardPages />} />
        <Route path="/spotify-instagram-link-dashboard" element={<SpotifyInstagramLinkDashboardPages />} />
        <Route path="/sound-cloud-dashboard" element={<SoundCloudDashboardPages />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
