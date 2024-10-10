import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import AddTicketPage from './pages/AddTicketPage'; // New page for adding tickets

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/add-new-ticket" element={<AddTicketPage />} /> {/* Add new ticket route */}
      </Routes>
    </Router>
  );
}

export default App;

