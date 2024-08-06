import React, { useEffect, useState, useRef } from 'react';
import "./AccountPage.css"
import { useTranslation } from 'react-i18next';

export default function ContactSupport() {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t("common:contactSupport")}</h2>
      <h3>{t("Have Questions, Complaints, or Suggestions? Please contact us with your inquiry!")}</h3>
    </div>
  );

}