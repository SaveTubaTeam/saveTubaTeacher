import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { sortByLastName, sortByFirstName } from "./studentSortingFunctions";

export default function StudentSortingOptions({ sortedStudentsArray, setSortedStudentsArray }) {
  const [sortingParam, setSortingParam] = useState("lastName"); //default sorting by Last Name

  useEffect(() => {
    if(sortedStudentsArray === null) { return; }

    if(sortingParam === "lastName") {
      setSortedStudentsArray(sortByLastName(sortedStudentsArray));
    } else if(sortingParam === "leastCompletions") {
      setSortedStudentsArray(sortedStudentsArray);
    } else if(sortingParam === "firstName") {
      setSortedStudentsArray(sortByFirstName(sortedStudentsArray));
    }

  }, [sortingParam]);

  if(sortedStudentsArray === null) { //guard clause whilst we load in Dashboard.jsx
    return null;
  }

  return (
  <FormControl fullWidth sx={{ margin: '30px 15px', width: '175px' }}>
    <InputLabel 
      id="select-sorting-param" 
      sx={{ 
        fontFamily: 'Montserrat',
        '&.Mui-focused': { color: 'black' },
        '&:hover': { color: 'black' },
        '&.Mui-focused:hover': { color: 'black' }
      }}
    >
      {`Sort By`}
    </InputLabel>
    {/* see: https://stackoverflow.com/questions/51387085/change-color-of-select-components-border-and-arrow-icon-material-ui */}
    <Select
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--dark-grey)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--dark-grey)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--dark-grey)' },
        fontFamily: 'Montserrat',
        fontSize: '1.1rem'
      }}
      labelId="select-sorting-param"
      id="select-sorting-param-component"
      value={sortingParam}
      label={`Sort By`}
      onChange={(event) => setSortingParam(event.target.value)}
    >
      <MenuItem value="lastName" sx={{ fontFamily: 'Montserrat' }}>Last Name</MenuItem>
      <MenuItem value="firstName" sx={{ fontFamily: 'Montserrat' }}>First Name</MenuItem>
      <MenuItem value="leastCompletions" sx={{ fontFamily: 'Montserrat' }}>Least Completions</MenuItem>
      <MenuItem value="mostCompletions" sx={{ fontFamily: 'Montserrat' }}>Most Completions</MenuItem>
    </Select>
  </FormControl>
  )
}