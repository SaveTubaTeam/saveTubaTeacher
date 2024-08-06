//all of the below functions return a new array (copy) so that we do not modify the original input array.
//these are pure functions to prevent object and array mutation side-effects

function sortByLastName(array) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
      return -1;
    }
    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  console.log("NOW SORTED BY LAST NAME:", sortedArray);
  return sortedArray;
}

function sortByFirstName(array) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  console.log("NOW SORTED BY FIRST NAME:", sortedArray);
  return sortedArray;
}

export { sortByLastName, sortByFirstName }