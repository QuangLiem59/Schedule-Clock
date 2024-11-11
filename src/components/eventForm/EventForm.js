import React, { useEffect, useState } from "react";
import "./EventForm.css";

const EventForm = () => {
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let timeList = localStorage.getItem("time-list")
      ? JSON.parse(localStorage.getItem("time-list"))
      : [];
    let [fromHour, fromMinute] = beginTime.split(":");
    let [toHour, toMinute] = endTime.split(":");

    timeList.push({
      id: timeList.length,
      title,
      fromHour,
      fromMinute,
      toHour,
      toMinute,
      color,
    });

    localStorage.setItem("time-list", JSON.stringify(timeList));

    setBeginTime("");
    setEndTime("");
    setTitle("");
    setColor("");
  };

  useEffect(() => {
    const popup = document.querySelector(".event-form");
    const popupHeader = document.querySelector(".event-form-header");

    let offsetX = 0,
      offsetY = 0,
      initialX = 0,
      initialY = 0;

    popupHeader.onmousedown = function (e) {
      e.preventDefault();
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmousemove = dragPopup;
      document.onmouseup = stopDragPopup;
    };

    function dragPopup(e) {
      e.preventDefault();
      offsetX = initialX - e.clientX;
      offsetY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      popup.style.top = popup.offsetTop - offsetY + "px";
      popup.style.left = popup.offsetLeft - offsetX + "px";
    }

    function stopDragPopup() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }, []);

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form-header">Time list</div>
      <div className="event-form-body">
        <div className="form-item">
          <label htmlFor="title">Công việc</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="begin-time">Bắt đầu</label>
          <input
            type="time"
            id="begin-time"
            value={beginTime}
            onChange={(e) => setBeginTime(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="end-time">Kết thúc</label>
          <input
            type="time"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="color">Màu</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
