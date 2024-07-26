import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Footer() {
   const navigate = useNavigate();

   // .mainFooter styling can be found in App.css
   return (
      <div className="mainFooter">
         <a 
            href="https://savetuba.com" 
            style={{ paddingLeft: '1.2rem' }} 
            id="copyrightFooter"
         >
            © 2024 Save Tuba
         </a>
        
         <span 
            style={{ paddingRight: '1.2rem' }} 
            id="contactSupport" 
            onClick={() => {
               navigate("/contact-support");
               //to scroll to the top of the contact support page.
               //see the answer provided by @Todd: https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js?page=2&tab=scoredesc#tab-top
               document.getElementById('root').scrollIntoView({ behavior: "instant" }); //see also: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
            }}
         >
            Contact Support
         </span>
      </div>
   );
}