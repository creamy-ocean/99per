import React, { memo } from "react";

const Banner = memo(({ text, isAlert }) => (
  <>{text && <p className={`banner ${isAlert ? "active" : ""}`}>{text}</p>}</>
));
export default Banner;
