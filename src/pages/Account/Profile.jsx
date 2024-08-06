import React, { useEffect, useState } from 'react';
import "./AccountPage.css"
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';
import LanguageSelector from '../../global-components/LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const teacher = useSelector(selectTeacher);
  const { t, i18n } = useTranslation();

  return (
    <>
      <h2>{t("common:account")}</h2>

      <span style={{ fontWeight: '600', marginBottom: '0.4rem' }}>
        {t("common:displayName")}
      </span>
      <input placeholder={`${teacher.lastName}`} disabled={true} />
      <p>{t("common:displayNameText")}</p>

      <span style={{ fontWeight: '600', marginBottom: '0.4rem', marginTop: '1.5rem' }}>
        {t("common:email")}
      </span>
      <input placeholder={teacher.email} disabled={true} />
      <p>
        {t("common:displayEmailTextOne")}<br />
        {t("common:displayEmailTextTwo")}
      </p>

      <h2 style={{ marginTop: '40px' }}>
        {t("common:settings")}
      </h2>

      <span style={{ fontWeight: '600', marginBottom: '0.4rem' }}>
        {t("common:changeLanguage")}
      </span>
      <LanguageSelector />
      <p style={{ marginTop: '0.5rem' }}>
        {t("common:currentLanguage")}: <em><strong>{`${i18n.language}`}</strong></em>
      </p>

    </>
  )
}