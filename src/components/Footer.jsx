import React, { useState, useEffect } from "react";

export default function Footer() {

   // .mainFooter styling can be found in App.css
   return (
      <div className="mainFooter">
        <span style={{ paddingLeft: '1.2rem' }}>© Save Tuba 2024</span>
        <span style={{ paddingRight: '1.2rem' }} id="contactSupport">Contact Support</span>
      </div>
   );
}