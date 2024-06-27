import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login'); // Redirect to login page if not logged in
      }
    }, [navigate]);
    return (
        <div>
            <h1>Create Assignment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateAssignment;