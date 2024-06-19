import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getLessonsData } from "../data/dataFunctions";

export default function LessonSelect({ grade, chapter, onChange }) {
  const languageCode = "en"; // Static language code
  const [lesson, setLesson] = useState("");
  const [lessons, setLessons] = useState([]); // State to store the lessons

  const handleChange = (event) => {
    const selectedLesson = event.target.value;
    setLesson(selectedLesson);
    onChange(selectedLesson);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!chapter) return;

      try {
        const lessons = await getLessonsData(grade, chapter, languageCode);
        setLessons(lessons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chapter]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="chapter-select-label"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Lesson
        </InputLabel>
        <Select
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          labelId="lesson-select-label"
          id="lesson-select"
          value={lesson}
          label="Lesson"
          onChange={handleChange}
        >
          <MenuItem value="" style ={{fontFamily: "Montserrat, sans-serif"}}>No Option</MenuItem>
          {lessons.map((lesson, index) => (
            <MenuItem key={index} value={lesson.navigation} style ={{fontFamily: "Montserrat, sans-serif"}}>
              {lesson.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}