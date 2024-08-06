import React from "react";
import { CircularProgress } from "@mui/material";

//see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
export default function Spinner() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          {/* please see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient */}
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--tertiary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} size={100}/>
    </>
  );
}