import React, { useEffect, useState } from 'react';
import "./AccountPage.css"
import { useSelector } from 'react-redux';
import { selectTeacher } from '../../../redux/teacherSlice';

export default function Profile() {
  const teacher = useSelector(selectTeacher);

  return (
    <>
      <h2>Account</h2>

      <span style={{ fontWeight: '600', marginBottom: '0.4rem' }}>Display Name</span>
      <input placeholder={`${teacher.lastName}`} disabled={true} />
      <p>Only your last name is displayed to students on the Save Tuba mobile app.</p>

      <span style={{ fontWeight: '600', marginBottom: '0.4rem', marginTop: '1.7rem' }}>Email</span>
      <input placeholder={teacher.email} disabled={true} />
      <p>This is the email by which the support team will contact you if you've recently submitted a help ticket.<br />
         Your email address is never shown to students or anyone else besides the support team.</p>

      <h2 style={{ marginTop: '40px' }}>Settings</h2>
    </>
  )
}