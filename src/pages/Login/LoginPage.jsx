import React from 'react';
import './LoginPage.css';
import { auth, provider, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInTeacher } from '../../../redux/teacherSlice';
import googleLogoButton from '../../assets/googleLogoButton.png';
import logoDarkText from '../../assets/logoDarkText.png';
import { toast } from 'react-toastify';

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

      // see link for toast.loading & toast.update implementation: https://fkhadra.github.io/react-toastify/promise#toastloading

      // @jac927 07/18/24 | I decided against toast.promise because the implementation is kinda weird. 
      // The alternative, which is toast.update, is kinda jank imo but is easier to read within try-catch and async await.
      // Note: I found that the options object in toast.update(notify, options) can override the options in ToastContainer - I think this is a bug but idk. Workaround was to hardcode the autoClose property.

      const popup = toast.loading(`Logging in`);

      const email = teacher.email;
      await getTeacher(email, popup);

      console.log(`logged in with: ${email}`);
      navigate("/class-selection");
      
    } catch(error) {

      //auth error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      if(error.code) { //firebase errors have a .code property
        console.error(`ERROR WITH GOOGLE SIGNIN | Error Code: ${error.code} | ${error.message}`);
        if(error.code === "auth/email-already-in-use") {
          toast.update(popup, { render: `Email already in use.`, type: "error", isLoading: false, autoClose: 1500 });
        } else if(error.code === "auth/popup-closed-by-user" || error.code === "cancelled-popup-request") {
          toast.update(popup, { render: `Popup closed`, type: "info", isLoading: false, autoClose: 1500 });
        } else if(error.code === "auth/popup-blocked") {
          toast.update(popup, { render: `Google popup was blocked. Please allow popups.`, type: "error", isLoading: false, autoClose: 1500 });
        } else { //catch others
          toast.update(popup, { render: `Invalid Login. Please try again.`, type: "error", isLoading: false, autoClose: 1500 });
        }

      } else { //not a firebase auth error
        console.error("ERROR in handleGooglePopupSignin:", error);
        toast.update(popup, { render: `An error occured. Please try again or contact support.`, type: "error", isLoading: false, autoClose: 1500 });
      }

    }
  }

  // we get only the teacher's document and NOT their assignments collection. 
  // retrieving assignments is done after entry.
  async function getTeacher(email, popup) {
    //TODO: replace w/ real teacher doc name
    const teacherDoc = await db.collection('teachers').doc('testteacher1@gmail.com').get();

    if(teacherDoc.exists) {
      const teacherData = teacherDoc.data();
      dispatch(signInTeacher({ data: teacherData })); //dispatching to teacherSlice store

      toast.update(popup, { render: `Login Success!`, type: "success", isLoading: false, autoClose: 1000 });

    } else { //teacherDoc does not exist
      const newTeacherData = await createNewTeacherAccount(); //this new account will NOT have any assignments
      dispatch(signInTeacher({ data: newTeacherData })); //dispatching to teacherSlice store

      toast.update(popup, { render: `Account Created. Welcome, ${newTeacherData.email}!`, type: "success", isLoading: false, autoClose: 1500 });
    }
  }

  async function createNewTeacherAccount() {
    //re: https://firebase.google.com/docs/reference/js/v8/firebase.User
    const teacher = auth.currentUser; // currentUser should be defined here - else the auth error was caught in handleGooglePopupSignin()

    const name = parseDisplayName(teacher.displayName); //an array is returned. [0] is firstName, [1] is lastName

    const newTeacherData = {
      classes: [], //initialized as empty
      email: teacher.email,
      photoURL: teacher.photoURL,
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
        <h1 style={{ color: 'var(--primary)' }}>Teacher Login</h1>
        
        <button 
          id="googleSignIn" 
          style={{ width: '80%', alignSelf: 'center' }} 
          onClick={handleGooglePopupSignin}
        >
          <img src={googleLogoButton} alt="Google Logo" />
          <span>Log in with Google</span>
        </button>

        <button 
          style={{ marginBottom: '2rem', width: '80%', alignSelf: 'center' }} 
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