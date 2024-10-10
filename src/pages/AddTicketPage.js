import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTicketPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [module, setModule] = useState('');
    const [type, setType] = useState('');
    const [state, setState] = useState('');
    const [level, setLevel] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTicket = {
            title,
            description,
            module,
            type,
            state,
            level,
        };

        try {
            await axios.post('http://localhost:5000/api/tickets', newTicket); // Adjust the API URL as necessary
            alert('Ticket added successfully!');
            navigate('/'); // Redirect to the homepage or wherever appropriate
        } catch (error) {
            console.error('Error adding ticket:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-success text-white">
                    <h3>Add New Ticket</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="module">Module</label>
                            <input
                                type="text"
                                className="form-control"
                                id="module"
                                value={module}
                                onChange={(e) => setModule(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="level">Level</label>
                            <input
                                type="text"
                                className="form-control"
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">Add Ticket</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTicketPage;
