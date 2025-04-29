import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".handsome-cursor")) {
        setVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}>
      <p className="text-primary pl-6 text-base font-bold">Tampan kan???</p>
    </div>
  );
}
