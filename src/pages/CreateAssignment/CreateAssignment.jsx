import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import './CreateAssignmentCSS.css';
import '../App.css';
import NavigationBar from '../../components/NavbarComponents/NavigationBar';

const CreateAssignment = () => {
    const [grade, setGrade] = useState('');
    const [chapter, setChapter] = useState('');
    const [lesson, setLesson] = useState('');
    const [dateDue, setDateDue] = useState('');
    const [numActivities, setNumActivities] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGradeChange = (e) => {
        setGrade(e.target.value);
    };

    const handleChapterChange = (e) => {
        setChapter(e.target.value);
    };

    const handleLessonChange = (e) => {
        setLesson(e.target.value);
    };

    const handleDateDueChange = (e) => {
        setDateDue(e.target.value);
    };

    const handleNumActivitiesChange = (e) => {
        setNumActivities(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();// Prevent page from refreshing

        const assignmentID = `G${grade}C${chapter}L${lesson}`;
        const dateAssigned = new Date().toLocaleString('en-GB').replace(',', '');

        // Format dateDue to match "DD.MM.YYYY, HH:MM"
        const dateDueFormatted = new Date(dateDue).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(',', '');

        // Create assignment object
        const assignmentData = {
            assignmentID: assignmentID,
            dateAssigned: dateAssigned,
            dateDue: dateDueFormatted,
            numActivities: parseInt(numActivities, 10)
        };
        const classCode = `000000`;

        try {
            // Save assignment to the teacher's class
            await db.collection('teachers')
                .doc(email)
                .collection(`Assignments_${classCode}`)
                .doc(assignmentID)
                .set(assignmentData);
            
            console.log('Assignment created successfully!');
            // Navigate to a different page if needed
            // navigate('/assignments');
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login'); // Redirect to login page if not logged in
        }
        setEmail(user.email);
    }, [navigate]);

    return (
        <div>
            <NavigationBar />
            <h1>Create Assignment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="grade">Grade:</label>
                    <input
                        type="text"
                        id="grade"
                        value={grade}
                        onChange={handleGradeChange}
                    />
                </div>
                <div>
                    <label htmlFor="chapter">Chapter:</label>
                    <input
                        type="text"
                        id="chapter"
                        value={chapter}
                        onChange={handleChapterChange}
                    />
                </div>
                <div>
                    <label htmlFor="lesson">Lesson:</label>
                    <input
                        type="text"
                        id="lesson"
                        value={lesson}
                        onChange={handleLessonChange}
                    />
                </div>
                <div>
                    <label htmlFor="dateDue">Date Due:</label>
                    <input
                        type="datetime-local"
                        id="dateDue"
                        value={dateDue}
                        onChange={handleDateDueChange}
                    />
                </div>
                <div>
                    <label htmlFor="numActivities">Number of Activities:</label>
                    <input
                        type="number"
                        id="numActivities"
                        value={numActivities}
                        onChange={handleNumActivitiesChange}
                    />
                </div>
                <button type="submit" className='sas'>Create</button>
            </form>
        </div>
    );
};

export default CreateAssignment;
