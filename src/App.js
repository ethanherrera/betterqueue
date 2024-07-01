// App.js
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import LandingPage from './LandingPage';
import JoinSessionPage from './JoinSessionPage';
import StartSessionPage from './StartSessionPage';
import { useSpotifyAuth } from './useSpotifyAuth';
import './index.css';
import LoadingScreen from './LoadingScreen';

const App = () => {
  const { token, handleLogout } = useSpotifyAuth();
  const [showStartSession, setShowStartSession] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(!token);
  const [showJoinSession, setShowJoinSession] = useState(false);

  const handleStartSession = () => {
    setShowLandingPage(false);
    setTimeout(() => setShowStartSession(true), 300);
  };

  const handleJoinSession = () => {
    setShowLandingPage(false);
    setTimeout(() => setShowJoinSession(true), 300);
  };

  const handleBackToLanding = () => {
    setShowJoinSession(false);
    setTimeout(() => setShowLandingPage(true), 300);
  };

  const handleLogoutWithDelay = () => {
    handleLogout();
    setTimeout(() => {
      setShowStartSession(false);
      setShowLandingPage(true);
    }, 500);
  };

  const handleSubmitSessionId = () => {
    // Implement logic to submit session ID
  };

  const handleSpotifyLogin = () => {
    const clientId = 'c9a261854ab148cb8f841590ec03c73c';
    const redirectUri = 'http://localhost:3000/';
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-library-read'
    ];
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  };

  return (
      <div className="h-screen w-screen bg-black text-white">
        <AnimatePresence>
          {showLandingPage && !token && (
              <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="landing">
                <LandingPage onStartSession={handleStartSession} onJoinSession={handleJoinSession} />
              </motion.div>
          )}

          {showJoinSession && !token && (
              <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="joinSession">
                <JoinSessionPage onSubmit={handleSubmitSessionId} onBack={handleBackToLanding} />
              </motion.div>
          )}

          {showStartSession && !token && (
              <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="startSession">
                <StartSessionPage onSpotifyLogin={handleSpotifyLogin} onBetterQueue={() => {}} />
              </motion.div>
          )}

          {token && (
              <motion.div className="h-full" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="player">
                <MusicPlayer onLogout={handleLogoutWithDelay} />
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default App;
