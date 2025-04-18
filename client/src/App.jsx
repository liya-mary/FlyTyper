import './App.css'
import React from 'react';
import Dashboard from './component/Dashboard'
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
