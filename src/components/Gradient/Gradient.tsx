import { useEffect, useRef, useState } from "react";
import { GradientHelper } from "./gradient-helper";

export type GradientProps = {
  colors: number[];
};

export default function Gradient({ colors }: GradientProps) {
  const gradient0 = useRef(new GradientHelper(colors));
  const gradient1 = useRef(new GradientHelper(colors));
  const [canvas0Style, setCanvas0Style] = useState({ opacity: 1 });
  const [canvas1Style, setCanvas1Style] = useState({ opacity: 0 });

  useEffect(() => {
    gradient0.current.initGradient("#gradient-canvas-0");
    gradient1.current.initGradient("#gradient-canvas-1");
  }, [gradient0, gradient1]);

  useEffect(() => {
    if (canvas0Style.opacity === 1) {
      gradient1.current.init(colors);
      setCanvas0Style({ opacity: 0 });
      setCanvas1Style({ opacity: 1 });
    } else {
      gradient0.current.init(colors);
      setCanvas0Style({ opacity: 1 });
      setCanvas1Style({ opacity: 0 });
    }
  }, [colors]);

  return (
    <>
      <canvas
        id="gradient-canvas-0"
        className="w-screen h-screen absolute transition-opacity duration-1000"
        style={canvas0Style}
      />
      <canvas
        id="gradient-canvas-1"
        className="w-screen h-screen absolute transition-opacity duration-1000"
        style={canvas1Style}
      />
    </>
  );
}
