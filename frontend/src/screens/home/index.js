import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import Duo from '../duo/index';
import Group from '../group/index';
import { useState, useEffect } from 'react';
import Loading from '../LoadingPage/Loading';
import LoginPage from '../Login/LoginPage';
import Homepage from './homepage';

function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Check if the animation has already been played
    const hasAnimationPlayed = localStorage.getItem('hasAnimationPlayed');
    if (hasAnimationPlayed) {
      setShowLoading(false);
    } else {
      setTimeout(() => {
        setShowLoading(false);
        // Persist that the animation has already been played
        localStorage.setItem('hasAnimationPlayed', true);
      }, 3000);
    }
  }, []);

  return (
    <div className="main-body">
      {showLoading ? (
        <Loading />
      ) : (
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/duo" element={<Duo />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default Home;
