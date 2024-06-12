import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGradeData } from "../data/dataFunctions";

export default function ChapterSelect({ onChange }) {
  const grade = "Grade5"; // Static grade value
  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState([]); // State to store the chapters

  const handleChange = (event) => {
    const selectedChapter = event.target.value;
    setChapter(selectedChapter);
    onChange(selectedChapter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapters = await getGradeData(grade);
        setChapters(chapters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="chapter-select-label">Chapter</InputLabel>
        <Select
          labelId="chapter-select-label"
          id="chapter-select"
          value={chapter}
          label="Chapter"
          onChange={handleChange}ß
        >
          <MenuItem value="">No Option</MenuItem>
          {chapters.map((chapter, index) => (
            <MenuItem key={index} value={chapter.navigation}>
              {chapter.navigation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
