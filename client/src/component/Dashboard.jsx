import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SoloPlay from './SoloPlay';


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
