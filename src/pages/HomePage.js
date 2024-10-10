import React from 'react';
import TicketList from '../components/TicketList';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Ticket Tracking System</h1>
        <Link to="/add-new-ticket" className="btn btn-success">
          Add New Ticket
        </Link>
      </div>
      <div>
          <TicketList />
      </div>
    </div>
  );
}

export default HomePage;