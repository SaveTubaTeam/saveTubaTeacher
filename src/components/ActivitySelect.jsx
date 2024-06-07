import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGradeData, getLessonsData } from "../data/dataFunctions";

export default function ActivitySelect() {
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]); // State to store the activities

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const grade = "Grade5";
      const languageCode = "en";
      try {
        console.log("Fetching grade data...");
        const chapters = await getGradeData(grade);
        console.log("Chapters fetched:", chapters);

        const lessonsPromises = chapters.map(async (chapter) => {
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
          return lessons;
        });

        const lessonsArray = await Promise.all(lessonsPromises);
        const flattenedLessons = lessonsArray.flat();
        const allActivities = flattenedLessons.flatMap(lesson =>
          lesson.masteryAndMinigames.map((activity) => ({
            ...activity,
            lessonTitle: lesson.title, // Optionally include the lesson title
          }))
        );
        setActivities(allActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Activity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activity}
          label="Activity"
          onChange={handleChange}
        >
          {activities.map((activity, activityIndex) => (
            <MenuItem key={activityIndex} value={activity.navigation}>
              {activity.navigation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
