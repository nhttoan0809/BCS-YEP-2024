import React from "react";
import BG from "../images/bg2.png";

export default ({ children }) => (
  <div className="relative flex">
    <img
      src={BG}
      alt="qr-page-background"
      className="w-screen h-screen object-cover object-top"
    />
    {children}
  </div>
);
