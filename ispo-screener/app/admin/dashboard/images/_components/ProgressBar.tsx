import React, { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import styles from "../styles/progress-bar.module.css";

export default function ProgressBar() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 200);
    const secondTimer = setTimeout(() => setProgress(88), 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, []);

  return (
    <Progress.Root className={styles["progress-root"]} value={progress}>
      <Progress.Indicator
        className={styles["progress-indicator"]}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}
