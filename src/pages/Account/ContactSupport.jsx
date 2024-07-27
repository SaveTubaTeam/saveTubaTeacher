import React, { useEffect, useState, useRef } from 'react';
import "./AccountPage.css"
import { useTranslation } from 'react-i18next';

export default function ContactSupport() {
  const { t } = useTranslation();
  return (
    <h2>{t("common:contactSupport")}</h2>
  )
}