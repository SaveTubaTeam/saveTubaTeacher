import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from '../../../firebase'; 
import { useNavigate } from 'react-router-dom';

const ClassSelect = ({ onChange }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      setEmail('testteacher1@gmail.com');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (email) {
        try {
          const teacherRef = await db.collection('teachers').doc(email).get();
          if (teacherRef.exists) {
            setTeacher(teacherRef.data());
          } else {
            console.log('Teacher not found');
          }
        } catch (error) {
          console.error('Error fetching teacher data:', error);
        }
      }
    };

    fetchTeacherData();
  }, [email]);

  const handleClassChange = (event) => {
    const selectedClass = classCollections.find(cls => cls.gradeLevel === event.target.value);
    setSelectedClass(selectedClass.gradeLevel);
    onChange({ grade: selectedClass.gradeLevel, className: selectedClass.className });
  };

  const classCollections = teacher ? teacher.classes : [];

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="class-select-label" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Class
        </InputLabel>
        <Select
          sx={{ fontFamily: "Montserrat, sans-serif" }}
          labelId="class-select-label"
          id="class-select"
          value={selectedClass}
          onChange={handleClassChange}
          label="Class"
        >
          <MenuItem value="" style={{ fontFamily: "Montserrat, sans-serif" }}>
            No Option
          </MenuItem>
          {classCollections.map((cls, index) => (
            <MenuItem key={index} value={cls.gradeLevel} style={{ fontFamily: "Montserrat, sans-serif" }}>
              {`${cls.className} - ${cls.gradeLevel}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassSelect;
