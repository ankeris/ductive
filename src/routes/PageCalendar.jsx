import '../assets/css/App.css';
import React, { Component, useState, useEffect } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
// Assets
import awareness from '../assets/sounds/awareness.mp3';

// Electron
const { remote } = require('electron');
const mainProcess = remote.require('./main.js');

export default function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    new Notification('Electron Notification');
  }, [])

  const currDate = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[today.getMonth()]} ${today.getDate()}`;
  }

  const onChange = date => {
    console.log(date);
  }

  const notify = () => {
    const audio = new Audio(awareness);
    audio.play();
    mainProcess.notify();
  }

    return (
      <div>
        <h1>Welcome to Ductive</h1>
        <h2>{currDate()}</h2>
        <Calendar
          onChange={onChange}
          value={date}
        />
        <button onClick={notify}>notify</button>
      </div>
    )
}
