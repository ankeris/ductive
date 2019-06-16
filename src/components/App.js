import '../assets/css/App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import PageCalendar from '../routes/PageCalendar.jsx';

function App() {
    useEffect(() => {
      console.log(this);
    }, [])
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={props => <PageCalendar {...props}/>} />
        </Switch>
      </BrowserRouter>
    )
}

export default App
