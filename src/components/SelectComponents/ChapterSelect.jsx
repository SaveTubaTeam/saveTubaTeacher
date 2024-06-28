import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGradeData } from "../../data/dataFunctions";

export default function ChapterSelect({grade, onChange }) {
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
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="chapter-select-label" style = {{fontFamily: "Montserrat, sans-serif"}}>Chapter</InputLabel>
        <Select
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          labelId="chapter-select-label"
          id="chapter-select"
          value={chapter}
          label="Chapter"
          onChange={handleChange}
        >
          <MenuItem value="" style ={{fontFamily: "Montserrat, sans-serif"}}>No Option</MenuItem>
          {chapters.map((chapter, index) => (
            <MenuItem key={index} value={chapter.navigation} style ={{fontFamily: "Montserrat, sans-serif"}}>
              {chapter.navigation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}