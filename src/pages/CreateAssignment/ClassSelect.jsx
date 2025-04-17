import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from '../../../firebase'; 

const ClassSelect = ({ onChange }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [email, setEmail] = useState('testteacher1@gmail.com'); //has multiple classrooms --> all associated classrooms will appear as selection options in create assignment
  // const [email, setEmail] = useState('savetuba2023@gmail.com'); //has 0 classrooms --> no classrooms will appear in create assignment bc none are associated

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
    const selectedClass = classCollections.find(cls => cls.className === event.target.value);
    setSelectedClass(selectedClass.className);
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
            <MenuItem key={index} value={cls.className} style={{ fontFamily: "Montserrat, sans-serif" }}>
              {`${cls.className} - ${cls.gradeLevel}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassSelect;
