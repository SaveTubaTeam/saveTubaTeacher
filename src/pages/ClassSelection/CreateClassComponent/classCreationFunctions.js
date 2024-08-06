import { db } from "../../../../firebase";

async function fetchClassCodes() {
  const classList = await db.collection("classrooms").get();
  return classList.docs.map((doc) => doc.data().classCode);
}

//@param {string[]} existingCodes an array of existing codes from calling the fetchClassCodes function
function generateRandomCode(existingCodes) {
  //we exclude 0 & O, L & I & 1, Z & 2, S & 5, B & 8 from the class codes because they can be confused with each other.
  const characters = 'ACDEFGHJKMNPQRTUVWXY34679'; //this gives us 244 million possible combinations :)
  const CODE_LENGTH = 6;
  let code = '';

  while (code.length < CODE_LENGTH) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];

    code += randomChar;
  }

  //see here for .includes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  if (existingCodes.includes(code)) { 
    return generateRandomCode(existingCodes); //recursive!!
  }

  return code;
}

export { generateRandomCode, fetchClassCodes }