import React from "react";
import QRCodeBG from "../images/qr-background.png";
import QRCode from "../images/BCS_YEP_QR.png";

const QRCodePage = () => {
  return (
    <div className="relative min-w-screen min-h-screen">
      <img
        src={QRCodeBG}
        alt="qr-page-background"
        className="absolute w-screen h-screen object-cover"
      />
      <img
        src={QRCode}
        className="absolute"
        style={{
          width: "35%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        alt="qr-code"
      />
    </div>
  );
};

export default QRCodePage;
