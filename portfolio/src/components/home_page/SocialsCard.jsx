import React from "react";
import { SocialIcon } from "react-social-icons";

const SocialsCard = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-around rounded-2xl p-2 ${className}`}
    >
      <SocialIcon
        style={{ height: 70, width: 70 }}
        url="https://github.com/amaydixit11"
      />
      <SocialIcon
        style={{ height: 70, width: 70 }}
        url="https://www.instagram.com/amaydixit05/"
      />
      <SocialIcon
        style={{ height: 70, width: 70 }}
        url="https://www.linkedin.com/in/amay-dixit-462113284/"
      />
      <SocialIcon
        style={{ height: 70, width: 70 }}
        url="https://x.com/AmayDixit11"
      />
    </div>
  );
};
export default SocialsCard;
