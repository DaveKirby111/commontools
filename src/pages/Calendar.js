import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthYear = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  };

  const prevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const monthYearString = getMonthYear(currentDate);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<li key={`empty-${i}`} className="p-2"></li>); // Empty cells for the first week
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();
    days.push(
      <li
        key={i}
        className={`p-2 text-center border border-gray-300 ${
          isToday ? "bg-blue-200 font-semibold" : ""
        }`}
      >
        {i}
      </li>
    );
  }

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center p-4">
          <button
            onClick={prevMonth}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            &lt;
          </button>
          <h2 id="month" className="text-xl font-semibold">
            {monthYearString}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>
        <div id="weekday" className="mb-2">
          <ul className="flex justify-around bg-gray-100 p-2">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
        </div>
        <div id="day">
          <ul className="grid grid-cols-7 gap-1">{days}</ul>
        </div>
        {/* <div id="notes">
          <h2>notes</h2>
        </div> */}
      </Layout>
    </>
  );
}
