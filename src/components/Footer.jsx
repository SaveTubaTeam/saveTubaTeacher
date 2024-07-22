import React, { useState, useEffect } from "react";

export default function Footer() {

   // .mainFooter styling can be found in App.css
   return (
      <div className="mainFooter">
        <a href="https://savetuba.com" style={{ paddingLeft: '1.2rem' }} id="copyrightFooter">© 2024 Save Tuba</a>
        <span style={{ paddingRight: '1.2rem' }} id="contactSupport">Contact Support</span>
      </div>
   );
}