import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getLessonsData } from "../data/dataFunctions";

export default function ActivitySelect({ grade, chapter, lesson, onChange }) { 
  const languageCode = "en";
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const defaultActivites = ["Mastery", "Image Boom", "Memory", "Snapshot", "Sorting", "Quiz", "Reorder"];

  const handleChange = (event) => {
    const selectedActivity = event.target.value;
    setActivity(selectedActivity);
    onChange(selectedActivity);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!chapter || !lesson) return;

      try {
        const lessons = await getLessonsData(grade, chapter, languageCode);
        const selectedLesson = lessons.find((l) => l.navigation === lesson);
        if (selectedLesson) {
          const activities = selectedLesson.masteryAndMinigames.map(
            (activity) => ({
              ...activity,
              lessonTitle: selectedLesson.title, // Optionally include the lesson title
            })
          );
          setActivities(activities);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chapter, lesson, languageCode]);

  function checkActivites() {
    if (activities.length === 0) {
      return defaultActivites.map((activity, index) => (
        <MenuItem key={index} value={activity} style={{ fontFamily: "Montserrat, sans-serif" }}>
          {activity}
        </MenuItem>
      ));
    } else {
      return activities.map((activity, index) => (
        <MenuItem key={index} value={activity.navigation} style={{ fontFamily: "Montserrat, sans-serif" }}>
          {activity.navigation}
        </MenuItem>
      ));
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="chapter-select-label"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Activity
        </InputLabel>
        <Select
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          labelId="activity-select-label"
          id="activity-select"
          value={activity}
          label="Activity"
          onChange={handleChange}
        >
          <MenuItem value="" style ={{fontFamily: "Montserrat, sans-serif"}}>No Option</MenuItem>
          {/* {activities.map((activity, index) => (
            <MenuItem key={index} value={activity.navigation} style ={{fontFamily: "Montserrat, sans-serif"}}>
              {activity.navigation}
            </MenuItem>
          ))} */}
          {checkActivites()}
        </Select>
      </FormControl>
    </Box>
  );
}