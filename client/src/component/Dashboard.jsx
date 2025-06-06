import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SoloPlay from './SoloPlay';
import React from 'react';
import QuickPlay from './QuickPlay';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/soloplay"
          element={<SoloPlay />}
        />
        <Route
          path="/quickplay"
          element={<QuickPlay />}
        />

      </Routes>
    </div>
  );
};

export default Dashboard;
