import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

export function FluidLayer() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!reduce && !coarse) setEnabled(true);

    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!enabled || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden
      style={{ mixBlendMode: "multiply" }}
    >
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <EffectComposer>
          <Fluid
            fluidColor="#c4654a"
            backgroundColor="#000000"
            showBackground={false}
            distortion={1.1}
            radius={0.06}
            curl={5}
            swirl={4}
            force={2}
            intensity={1.1}
            densityDissipation={0.96}
            velocityDissipation={0.97}
            pressure={0.85}
            rainbow={false}
            blend={4}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

