import React, { useEffect, useState } from "react";
import "./Clock.css";

const Clock = () => {
  const [isPlay, setIsPlay] = useState(true);
  const events = localStorage.getItem("time-list")
    ? JSON.parse(localStorage.getItem("time-list"))
    : [];

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const hourDeg = (hours + minutes / 60) * 15;
      const minuteDeg = minutes * 6;
      const secondDeg = seconds * 6;

      document.querySelector(
        ".hour-hand"
      ).style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      document.querySelector(
        ".minute-hand"
      ).style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
      document.querySelector(
        ".second-hand"
      ).style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    const itv = setInterval(updateClock, 1000);
    if (isPlay) {
      updateClock();
    } else {
      clearInterval(itv);
    }

    return () => {
      clearInterval(itv);
    };
  }, [isPlay]);

  return (
    <div className="clock-container">
      <div className="title">
        <h3>TODAY'S TIME TABLE </h3>
      </div>
      <div className="clock">
        <div className="clock-hours">
          {Array(24)
            .fill()
            .map((time, index) => {
              return (
                <div
                  key={index}
                  className="clock-hour"
                  style={{ transform: `rotate(${index * 15}deg)` }}
                >
                  {index}
                </div>
              );
            })}
        </div>
        <div className="center-circle" onClick={() => setIsPlay(!isPlay)}>
          {isPlay ? "PLAY" : "PAUSE"}
        </div>

        {events.map((divider, index) => {
          let startAngle = (+divider.fromHour + +divider.fromMinute / 60) * 15;
          let endAngle = (+divider.toHour + +divider.toMinute / 60) * 15;

          let midAngle = (startAngle + endAngle) / 2;

          const fontSize = Math.max(10, 80 / divider.title.length);

          let backgroundStyle = {
            background: `conic-gradient(
              transparent ${startAngle}deg,
              ${divider.color} ${startAngle}deg,
              ${divider.color} ${endAngle}deg,
              transparent ${endAngle}deg
            )`,
          };

          if (startAngle > endAngle) {
            midAngle -= 180;
            backgroundStyle = {
              background: `conic-gradient(
              from ${startAngle}deg,
              ${divider.color} 0deg ${360 - startAngle + endAngle}deg,
              transparent ${360 - startAngle + endAngle}deg 
            )`,
            };
          }

          return (
            <div key={index} className="divider" style={backgroundStyle}>
              <div
                className="activity-text"
                style={{
                  transform:
                    midAngle > 180
                      ? `rotate(${midAngle}deg) translateY(-170px) rotate(90deg) translateY(-50%)`
                      : `rotate(${midAngle}deg) translateY(-70px) rotate(-90deg) translateY(-50%)`,
                  fontSize: `${fontSize}px`,
                }}
              >
                {divider.title}
              </div>
            </div>
          );
        })}

        <div className="hand hour-hand"></div>
        <div className="hand minute-hand"></div>
        <div className="hand second-hand"></div>
      </div>
    </div>
  );
};

export default Clock;
