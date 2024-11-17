import React, { useEffect, useRef, useState } from "react";
import "../styles/gradient_bubble.scss";

const InteractiveBubble = () => {
  const interBubbleRef = useRef(null);
  const [curPos, setCurPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = () => {
      setCurPos((curPos) => ({
        x: curPos.x + (targetPos.x - curPos.x) / 20,
        y: curPos.y + (targetPos.y - curPos.y) / 20,
      }));
      requestAnimationFrame(move);
    };

    move();

    const handleMouseMove = (event) => {
      setTargetPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [targetPos]);

  useEffect(() => {
    if (interBubbleRef.current) {
      interBubbleRef.current.style.transform = `translate(${Math.round(
        curPos.x
      )}px, ${Math.round(curPos.y)}px)`;
    }
  }, [curPos]);

  return <div className="interactive" ref={interBubbleRef}></div>;
};

export default InteractiveBubble;
