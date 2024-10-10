import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  statusMapping,
  ticketTypeMapping,
  priorityMapping,
} from "../components/TicketList";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:5279/api/tickets/${id}`
        );
        const response2 = await axios.get("http://localhost:5279/api/replies");
        setTicket(response1.data);
        setReplies(response2.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    const replyData = {
      content: reply,
      ticketId: ticket.id,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`http://localhost:5279/api/replies/`, replyData);
      alert("Reply added successfully!");
      setReply("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-center">Ticket #</h3>
            <h3 className="text-center">
              {ticket.id} - {ticket.title}
            </h3>
            <div>
              <button className="btn btn-secondary me-2" onClick={handleClose}>
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </div>
          <h5 className="mt-2">New Reply</h5>
          <form onSubmit={handleReplySubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                id="reply"
                rows="3"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              ></textarea>
            </div>
          </form>
        </div>
        <div className="card-body d-flex">
          <div className="col-md-6">
            <div className="row mb-3">
              <div className="col-md-12">
                <strong>Module:</strong> {ticket.applicationName}
              </div>
              <div className="col-md-12">
                <strong>Urgent Lvl:</strong>{" "}
                {priorityMapping[ticket.priorityId]}
              </div>
              <div className="col-md-12">
                <strong>Type:</strong> {ticketTypeMapping[ticket.ticketTypeId]}
              </div>
              <div className="col-md-12">
                <strong>State:</strong> {statusMapping[ticket.statusId]}
              </div>
              <div className="col-md-12">
                <strong>Description:</strong> {ticket.description}
              </div>
            </div>
          </div>
          <div
            className="col-md-6 overflow-auto"
            style={{ maxHeight: "300px" }}
          >
            <h5>Replies</h5>
            <div>
              {replies.map(
                (reply, index) =>
                  ( reply.tId === ticket.id &&
                    <div key={index} className="border-bottom py-2">
                      {reply.reply}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
