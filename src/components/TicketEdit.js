import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TicketEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({});
  const [reply, setReply] = useState('');

  useEffect(() => {
    axios.get(`/api/tickets/${id}`)  // fetch ticket details
      .then(response => setTicket(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/tickets/${id}/reply`, { reply })  // update ticket with a reply
      .then(() => {
        alert("Reply added successfully");
        navigate('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container">
      <h1>Edit Ticket</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ticket.title}</h5>
          <p className="card-text">{ticket.description}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reply">Add Reply</label>
              <textarea
                className="form-control"
                id="reply"
                rows="3"
                value={reply}
                onChange={e => setReply(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success mt-3">Submit Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketEdit;
