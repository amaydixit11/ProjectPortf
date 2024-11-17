// components/RadialGradientCursor.js

import { useEffect, useState } from "react";
import "../styles/radial_gradient_cursor.css";

const RadialGradientCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={`cursor`} style={{ left: position.x, top: position.y }} />
  );
};

export default RadialGradientCursor;
