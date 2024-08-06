import React, { useEffect, useState, useRef } from 'react';
import "./AccountPage.css"
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ContactSupport() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <h2>{t("common:contactSupport")}</h2>
        <h3>{t("Have Questions, Complaints, or Suggestions? Please contact us with your inquiry!")}</h3>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            fontFamily: 'Montserrat, sans-serif',
          }}
          noValidate
        >
          <TextField id="firstName-field" label="First Name" variant="outlined" />
        </Box>
      </div>
    </>
  );
}
