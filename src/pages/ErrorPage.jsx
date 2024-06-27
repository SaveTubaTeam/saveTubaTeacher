import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);
  console.error(error);
  return (
    <div id="error-page" style={{fontFamily:"Montserrat, sans-serif"}}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}