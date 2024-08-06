import React from "react";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../pages/Login/LoginPage.css";
import logoDarkText from "../assets/logoDarkText.png";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(`ErrorPage.jsx ERROR: ${error.statusText || error.message}`);
  //console.trace(error); //stack trace

  //default error message
  let content = [t("error:pageRouterError"), t("error:pleaseTryAgain")];
  if(error?.status === 404) {
    content = [t("error:pageNotFound"), t("error:pageDoesNotExist")];
  }
  
  return (
    <div className="background" id="errorPage" style={{ fontFamily: 'Montserrat' }}>
    <img src={logoDarkText} alt="Logo Dark" id="logoDark" />

      <h1 style={{ fontSize: '6rem', paddingTop: '3.2rem' }}>
        {t("error:oops")}
      </h1>
      <h3 style={{ marginTop: '1.8rem', marginBottom: '1.3rem' }}>
        {content[0]}
      </h3>
      <p style={{ margin: '0', padding: '0', marginBottom: '0.7rem' }}>
        <i>{content[1]}</i>
      </p>

      <button 
        style={{ fontSize: '0.9rem', padding: '0.5rem 2rem', marginTop: '0.4rem' }}
        onClick={() => navigate("/class-selection")}
      >
        {t("common:backToClassrooms")}
      </button>
    </div>
  );
}