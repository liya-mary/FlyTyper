// import './App.css'
import Dashboard from './component/Dashboard'
import Home from './component/Home';
import Navbar from "./component/Navbar"
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (

    < >
      <Router>
        <Navbar />
        <Dashboard />
      </Router>
    </>

  )
}

export default App
