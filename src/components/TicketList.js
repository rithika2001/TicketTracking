import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const statusMapping = {
  1: 'New',
  2: 'Open',
  3: 'Awaiting Response - User',
  4: 'Awaiting Response - Development',
  5: 'Awaiting Response - Vendor',
  6: 'Closed'
};

export const ticketTypeMapping = {
  1: 'Bug',
  2: 'Feature Request',
  3: 'Task',
  4: 'Improvement'
};

export const priorityMapping = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Priority',
  5: 'None'
};

const getPriorityColor = (priorityId) => {
  switch (priorityId) {
    case 1: return 'green';      // Low
    case 2: return 'yellow';     // Medium
    case 3: return 'red';        // High
    case 4: return 'darkred';    // Critical
    default: return 'white';     // None
  }
};

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Replace with the actual API URL for your .NET Core API
    axios.get('http://localhost:5279/api/tickets')  
      .then(response => setTickets(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <table className="table table-bordered" style={{ borderColor: 'black', textAlign:'center' }}>
          <thead>
            <tr style={{ borderColor: 'white', borderBottomColor:'black' }}>
              <th scope="col">Lvl</th>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Module</th>
              <th scope="col">Type</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td style={{ textAlign: 'center' }}>
                  {/* Circle with color and border for priority */}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: getPriorityColor(ticket.priorityId),
                      border: '2px solid black' // Adding a black border to the circle
                    }}
                  ></span>
                </td>
                <td>{ticket.id}</td>
                <td>
                  <Link to={`/edit/${ticket.id}`} className="text-decoration-none">
                    {ticket.title}
                  </Link>
                </td>
                <td>{ticket.applicationName}</td>
                <td>{ticketTypeMapping[ticket.ticketTypeId]}</td>
                <td>{statusMapping[ticket.statusId]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TicketList;