import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { sortByLastName, sortByFirstName, sortByLeastCompletions, sortByMostCompletions } from "./studentSortingFunctions";
import { useTranslation } from 'react-i18next'; //needed for translations

export default function StudentSortingOptions({ sortedStudentsArray, setSortedStudentsArray, selectedAssignment }) {
  const [sortingParam, setSortingParam] = useState("lastName"); //default sorting by Last Name
  const { t } = useTranslation(); //needed for translations

  useEffect(() => {
    if(sortedStudentsArray === null || selectedAssignment === null) { return; } //guard clause whilst we load

    const assignmentID = selectedAssignment.assignmentID;

    if(sortingParam === "lastName") {
      setSortedStudentsArray(sortByLastName(sortedStudentsArray));
    } else if(sortingParam === "firstName") {
      setSortedStudentsArray(sortByFirstName(sortedStudentsArray));
    } else if(sortingParam === "leastCompletions") {
      setSortedStudentsArray(sortByLeastCompletions(sortedStudentsArray, assignmentID));
    } else if(sortingParam === "mostCompletions") {
      setSortedStudentsArray(sortByMostCompletions(sortedStudentsArray, assignmentID));
    }

  }, [sortingParam]);

  if(sortedStudentsArray === null || selectedAssignment === null) { //guard clause whilst we load
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
      {/* {`Sort By`} */}
      {`${t("common:sortBy")}`}
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
      {/* lastName */}
      <MenuItem value="lastName" sx={{ fontFamily: 'Montserrat' }}>{`${t("common:lastName")}`}</MenuItem> 
      {/* firstName */}
      <MenuItem value="firstName" sx={{ fontFamily: 'Montserrat' }}>{`${t("common:firstName")}`}</MenuItem>
      {/* leastCompletions */}
      <MenuItem value="leastCompletions" sx={{ fontFamily: 'Montserrat' }}>{`${t("common:leastCompleted")}`}</MenuItem>
      {/* mostCompletions */}
      <MenuItem value="mostCompletions" sx={{ fontFamily: 'Montserrat' }}>{`${t("common:mostCompleted")}`}</MenuItem>
    </Select>
  </FormControl>
  )
}