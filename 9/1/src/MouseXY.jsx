import { useEffect, useState } from "react";

const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

function MouseXY() {
  const mousePointer = useMousePointer();

  return (
    <>
      Your mouse position is {mousePointer.x} {mousePointer.y}
    </>
  );
}

export default MouseXY;
