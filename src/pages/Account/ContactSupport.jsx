import React, { useEffect, useState, useRef } from "react";
import "./AccountPage.css";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Padding } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";

export default function ContactSupport() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // You can replace this with an API call or other logic
    console.log("Submitted data:", formData);
    e.preventDefault();

    const { firstName, lastName, email, phone, message } = formData;

    // Replace these with your EmailJS credentials
    const userID = "YOUR_EMAILJS_USER_ID";
    const serviceID = "YOUR_EMAILJS_SERVICE_ID";
    const templateID = "YOUR_EMAILJS_TEMPLATE_ID";

    const templateParams = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    // Send the email
    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (response) => {
          console.log("SUCCESS:", response);
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.error("FAILED:", error);
          alert("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("common:contactSupport")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t("Have Questions, Complaints, or Suggestions? Please contact us with your inquiry!")}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="phone"
            label="Phone Number"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="message"
            label="Type your message here"
            variant="outlined"
            value={formData.message}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}