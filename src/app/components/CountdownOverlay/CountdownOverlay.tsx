import React, { useEffect, useState } from "react";
import "./Styles.css";

const CountdownOverlay: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const targetDate = new Date(Date.UTC(2024, 7, 19, 23, 30, 0)); // August 24, 2024, at 3 PM UTC
    // const targetDate = new Date(Date.UTC(2024, 7, 22, 12, 0, 0)); // August 24, 2024, at 3 PM UTC

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(
          `${days} days ${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      } else {
        setTimeLeft("00:00:00");
        setIsVisible(false); // Hide the overlay when the countdown ends
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null; // Do not render the overlay if it is not visible

  return (
    <div style={styles.overlay}>
      <div className="p-8 bg-grey rounded-xl">
        <h1 className="text-white text-4xl text-center">
          BTC Staking LIVE in:
        </h1>
        <div style={styles.timer}>{timeLeft}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
  },
  timer: {
    fontSize: "58px",
    color: "#ffffff",
  },
};

export default CountdownOverlay;
