import React from 'react';
import { useTranslation } from 'react-i18next';
import "./LanguageSelector.css"
import kkFlag from '../../assets/kz.png';
import ruFlag from '../../assets/ru.png';
import enFlag from '../../assets/en.png';

const LANGUAGES = [
  { code: "kk", flag: kkFlag },
  { code: "ru", flag: ruFlag },
  { code: "en", flag: enFlag },
]

export default function LanguageSelector() {
  const { t, i18n } = useTranslation(); //useTranslation() docs: https://react.i18next.com/latest/usetranslation-hook
  const currentLanguageCode = i18n.language; //default is kk (could be kk, en, ru)

  return (
    <div className="flagContainer">
      {LANGUAGES.map((language) => {
        const isLanguageSelected = (language.code === currentLanguageCode); //boolean

        return (
          <div 
            key={language.code}
            onClick={async() => {
              if(isLanguageSelected) { return; } //early return for already selected language code
              await i18n.changeLanguage(language.code);
            }}
          >
            <img 
              src={language.flag} 
              className={`languageFlag ${isLanguageSelected ? 'active' : ''}`}
              alt={`${language.code} flag`}
            />
          </div>
        )
      })}
    </div>
  )
}