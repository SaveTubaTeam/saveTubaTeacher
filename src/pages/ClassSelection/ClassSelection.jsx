import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ViewStudentPopup from '../../components/DashboardComponents/ViewStudentComponents/ViewStudentsPopup';
import 


function ClassSelection() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
    setEmail('testteacher1@gmail.com');
  }, [navigate]);

  const classes = [
    { name: "Class 4 - A", grade: "Grade 4", assignments: 14 },
    { name: "Class 4 - B", grade: "Grade 4", assignments: 12 },
    { name: "Class 2 - B", grade: "Grade 2", assignments: 20 },
  ];

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="App">
      <h1>My Classes</h1>
      <div className="year">2024-2025</div>
      <div className="class-list">
        {classes.map((classItem, index) => (
          <ClassCard key={index} classItem={classItem} />
        ))}
        <AddClassCard />
      </div>
      <div className="year">2025-2026</div>
      <div className="class-list">
        <AddClassCard />
        <AddClassCard />
        <AddClassCard />
        <AddClassCard />
      </div>
    </div>
  );
}

const ClassCard = ({ classItem }) => (
  <div className="class-card">
    <h2>{classItem.name}</h2>
    <p>{classItem.grade}</p>
                <Button
                variant="contained"
                color="primary"
                onClick={handleOpenPopup}
                sx={{ fontFamily: "Montserrat, sans-serif" }}
              >
                View Students
              </Button>
              <ViewStudentPopup
              open={popupOpen}
              onClose={handleClosePopup}
              classCode={classCode}
            />
    <button className="assignments-button">{classItem.assignments} Assignments</button>
  </div>
);

const AddClassCard = () => (
  <div className="class-card add-class-card">
    <p>+ Add Class</p>
  </div>
);

export default ClassSelection;
