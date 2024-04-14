import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BotManager from './components/BotManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bots" element={<BotManager />} />
        {/* Update other routes similarly */}
      </Routes>
    </Router>
  );
}

export default App;
