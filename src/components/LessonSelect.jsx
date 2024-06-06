import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getGradeData, getLessonsData } from '../data/dataFunctions';

export default function ChapterSelect() {
  const [lesson, setLesson] = useState("");
  const [lessons, setLessons] = useState([]); // State to store the chapters

  const handleChange = (event) => {
    setLesson(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const grade = "Grade5"; 
      const languageCode = "en";
      try {
        console.log("Fetching grade data...");
        const chapters = await getGradeData(grade);
        console.log("Chapters fetched:", chapters);
        const lessonsPromises = chapters.map(async (chapter, chapterIndex) => {
          console.log(`Fetching lessons for chapter ${chapter.navigation}...`);
          const lessons = await getLessonsData(
            grade,
            chapter.navigation,
            languageCode
          );
          console.log(
            `Lessons for chapter ${chapter.navigation} fetched:`,
            lessons
          );
        });
        setLessons(lessons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lesson}
          label="Lesson"
          onChange={handleChange}
        >
          {lessons.map((lessons, lessonsIndex) => (
            <MenuItem key={lessonsIndex} value={lessons.navigation}>
              {lesson.navigation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
