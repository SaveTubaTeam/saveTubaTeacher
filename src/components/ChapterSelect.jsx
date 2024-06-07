import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from 'react';
import { getGradeData } from '../data/dataFunctions';

export default function ChapterSelect() {
  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState([]); // State to store the chapters

  const handleChange = (event) => {
    setChapter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const grade = "Grade5"; // Example grade, change as needed

      try {
        console.log("Fetching grade data...");
        const chapters = await getGradeData(grade);
        console.log("Chapters fetched:", chapters);
        setChapters(chapters); // Set the chapters in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chapter}
          label="Chapter"
          onChange={handleChange}
        >
          {chapters.map((chapter, chapterIndex) => (
            <MenuItem key={chapterIndex} value={chapter.navigation}>{chapter.navigation}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
