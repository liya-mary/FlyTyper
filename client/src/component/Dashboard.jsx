import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SoloPlay from './SoloPlay';
import React from 'react';


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
      </Routes>
    </div>
  );
};

export default Dashboard;
