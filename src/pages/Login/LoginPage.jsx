import React, { useEffect } from 'react';
import './LoginPage.css';
import { auth, provider, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInTeacher } from '../../../redux/teacherSlice';
import googleLogoButton from '../../assets/googleLogoButton.png';
import logoDarkText from '../../assets/logoDarkText.png';
import { toast } from 'react-toastify'; //see: https://fkhadra.github.io/react-toastify/api/toast

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TODO: localize OAuth flow: https://firebase.google.com/docs/auth/web/google-signin#web_5
  async function handleGooglePopupSignin() {
    try {
      //please see: https://firebase.google.com/docs/auth/web/google-signin
      const result = await auth.signInWithPopup(provider);
      const teacher = result.user;
      //console.log("TEACHER JSON:", teacher);

      const email = teacher.email;
      await getTeacher(email);

      console.log(`logged in with: ${email}`);
      navigate("/class-selection");
      
    } catch(error) {

      //auth error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      if(error.code) { //firebase errors have a .code property
        console.error(`ERROR WITH GOOGLE SIGNIN | Error Code: ${error.code} | ${error.message}`);
        if(error.code === "auth/email-already-in-use") {
          toast.error(`Email already in use.`);
        } else if(error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
          toast.error(`Google popup was blocked. Please allow popups.`);
        } else if(error.code === "auth/network-request-failed") {
          toast.error("Network Request Failed. Please try again or contact support.")
        } else if(error.code === "auth/popup-closed-by-user") {
          return; //do nothing here
        } else { //catch others
          toast.error(`Invalid Login. Please try again.`);
        }

      } else { //not a firebase auth error
        console.error("ERROR in handleGooglePopupSignin:", error);
        toast.error(`An error occured. Please try again or contact support.`);
      }

    }
  }

  // we get only the teacher's document and NOT their assignments collection. 
  // retrieving assignments is done after entry.
  async function getTeacher(email) {
    //TODO: replace w/ real teacher doc name
    const teacherDoc = await db.collection('teachers').doc('testteacher1@gmail.com').get();

    if(teacherDoc.exists) {
      const teacherData = teacherDoc.data();
      dispatch(signInTeacher({ data: teacherData })); //dispatching to teacherSlice store

    } else { //teacherDoc does not exist
      const newTeacherData = await createNewTeacherAccount(); //this new account will NOT have any assignments
      dispatch(signInTeacher({ data: newTeacherData })); //dispatching to teacherSlice store

      toast.success(`Account Created. Welcome, ${newTeacherData.email}!`);
    }
  }

  async function createNewTeacherAccount() {
    //re: https://firebase.google.com/docs/reference/js/v8/firebase.User
    const teacher = auth.currentUser; // currentUser should be defined here - else the auth error was caught in handleGooglePopupSignin()

    let photoURL = "";
    if(teacher.photoURL) { 
      // See: https://support.google.com/mail/thread/11538455/how-can-i-view-someones-profile-picture-in-better-resolution?hl=en
      const upscaledImage = teacher.photoURL.replace(/=s\d+-c$/, '=s200-c');
      photoURL = upscaledImage;
    }

    const name = parseDisplayName(teacher.displayName); //an array is returned. [0] is firstName, [1] is lastName

    const newTeacherData = {
      classes: [], //initialized as empty
      email: teacher.email,
      photoURL: photoURL,
      firstName: name[0],
      lastName: name[1],
    }
    console.log("New teacher data:", newTeacherData);
    await db.collection("teachers").doc(teacher.email).set(newTeacherData);

    return newTeacherData;
  }

  return (
    <div className='background'>
    <img src={logoDarkText} alt="Logo Dark" id="logoDark" />

    <div style={{ padding: '2rem' }}></div>
      <div className="loginContainer" style={{ height: 420 }}>
        <h1>Teacher Login</h1>
        
        <button 
          id="googleSignIn" 
          style={{ marginTop: '7rem', width: '85%', alignSelf: 'center' }} 
          onClick={handleGooglePopupSignin}
        >
          <img src={googleLogoButton} alt="Google Logo" />
          <span>Log in with Google</span>
        </button>

        <button 
          style={{ marginBottom: '2rem', width: '85%', alignSelf: 'center' }} 
          onClick={() => navigate("/alt-login")}
        >
          Other
        </button>
      </div>
    </div>
  );
}

//@returns {string[]} index 0 is first name, index 1 is last name or empty string if it doesnt exist
//NOTE edge cases: 
// - this function is error-prone to first names with more than one word
function parseDisplayName(displayName) {
  try {
    const result = [];
    const parts = displayName.trim().split(' ');
    
    result.push(parts[0]); //first name

    if(parts.length === 1) { //no space for split found
      result.push(" "); //empty string for last name
    } else { //last name exists
      result.push(parts[1]);
    }

    return result;
  } catch(error) {
    console.error('Error parsing display name:', error.message);
  }
}