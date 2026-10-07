import { useEffect, useState } from "react";
import { formatMoney } from "../utils/constants";

// Animates a number from its previous value to the new one
export default function CountUp({ value }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const start = shown;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / 800, 1);
      setShown(Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{formatMoney(shown)}</>;
}
