import React, { useEffect, useState, useRef } from "react";
import "./AccountPage.css";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Padding } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";

export default function ContactSupport() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <h2>{t("common:contactSupport")}</h2>
        <h3>
          {t(
            "Have Questions, Complaints, or Suggestions? Please contact us with your inquiry!"
          )}
        </h3>
      </div>
      <Grid container spacing={2} className="montserrat-font">
        <Grid item xs={5}>
          <TextField
            
            id="firstName-field"
            label="First Name"
            variant="outlined"
            sx={{ }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            
            id="lastName-field"
            label="Last Name"
            variant="outlined"
            sx={{ }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            
            id="email-field"
            label="Email"
            variant="outlined"
            sx={{ }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            
            id="phonenumber-field"
            label="Phone Number"
            variant="outlined"
            sx={{ }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="message-field"
            label="Type your message here"
            variant="outlined"
            sx={{ }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left' }}>
          <button>
            Submit
          </button>
        </Grid>
      </Grid>
    </>
  );
}
