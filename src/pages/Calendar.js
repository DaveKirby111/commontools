import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "../styles/Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("calendarNotes");
    return storedNotes ? JSON.parse(storedNotes) : {};
  });
  const [currentNote, setCurrentNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
  }, [notes]);

  const getMonthYear = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
    setSelectedDate(null);
    setCurrentNote("");
  };

  const nextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
    setCurrentNote("");
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day);
    const formattedDate = getFormattedDate(clickedDate);
    setSelectedDate(formattedDate);
    setCurrentNote(notes[formattedDate] || "");
  };

  const handleNoteChange = (event) => {
    setCurrentNote(event.target.value);
  };

  const saveNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDate]: currentNote,
      }));
    }
  };

  const deleteNote = () => {
    if (selectedDate && notes[selectedDate]) {
      const newNotes = { ...notes };
      delete newNotes[selectedDate];
      setNotes(newNotes);
      setCurrentNote("");
    }
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
    const currentDateForDay = new Date(year, month, i);
    const formattedDate = getFormattedDate(currentDateForDay);
    const hasNote = !!notes[formattedDate];
    const isToday =
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();
    const isSelected = formattedDate === selectedDate;

    days.push(
      <li
        key={i}
        className={`p-2 text-center cursor-pointer ${
          isToday ? "bg-blue-200 font-semibold" : ""
        } ${isSelected ? "bg-green-200" : ""} ${hasNote ? "relative" : ""}`}
        onClick={() => handleDayClick(i)}
      >
        {i}
        {hasNote && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </li>
    );
  }

  return (
    <>
      <Layout page="Calendar">
        <div className="w-3/4 mx-auto border-4 border-black flex flex-col mt-4">
          <div className="themonth flex justify-between items-center p-4">
            <button
              onClick={prevMonth}
              className="p-2 text-3xl rounded-md hover:bg-gray-200"
            >
              &lt;
            </button>
            <h2 id="month" className="font-semibold">
              {monthYearString}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 text-3xl rounded-md hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
          <div id="weekday" className="mb-2">
            <ul className="flex justify-around bg-gray-100 p-2 text-2xl">
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
            <ul className="grid grid-cols-7 gap-1 text-xl">{days}</ul>
          </div>
        </div>

        <p className=" text-2xl text-center mt-7">
          To edit a note, just click in the text box.
        </p>

        <div
          id="notes"
          className="w-3/4 mx-auto mt-7 border-2 border-gray-300 p-4 rounded mb-4"
        >
          <h2 className="text-xl font-semibold mb-2">
            Notes for {selectedDate ? selectedDate : "Select a date"}
          </h2>
          {selectedDate ? (
            <>
              <textarea
                className="w-full h-32 border rounded p-2 mb-2"
                value={currentNote}
                onChange={handleNoteChange}
                placeholder="Add your note here..."
              />
              <div className="flex justify-end">
                <button
                  onClick={saveNote}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save Note
                </button>
                {notes[selectedDate] && (
                  <button
                    onClick={deleteNote}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Note
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>Click on a date to view and add notes.</p>
          )}
        </div>
      </Layout>
    </>
  );
}
