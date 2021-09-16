import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import HomeTeamMember from './components/TeamMember/HomeTeamMember/HomeTeamMember';
import { ACCESS_TOKEN_NAME } from './constants/apiConstants';
import { createBrowserHistory } from 'history';
import PollApexcharts from './components/Admin/PollApexcharts/PollApexcharts';
import ModifyPollRequest from './components/Admin/ModifyPollRequest/ModifyPollRequest';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Footer from './components/Footer/Footer';
//import Footer from './components/Footer/Footer';
//auii

function App(props) {
  const [title, updateTitle] = useState(null);
  const history = createBrowserHistory();

  let myInterval;
  const setTimer = (hour, minutes, seconds) => {
    myInterval = setInterval(() => {
     // console.log("hour min sec", hour, minutes, seconds)
      if (seconds > 0) {
        seconds = seconds - 1;
        localStorage.setItem("sessionTimeoutSecond", seconds);
      }
      else if (minutes > 0) {
        minutes = minutes - 1;
        seconds = 59
        localStorage.setItem("sessionTimeoutSecond", seconds);
        localStorage.setItem("sessionTimeoutMinute", minutes);
      }
      else if (hour > 0) {
        hour = hour - 1;
        minutes = 59;
        seconds = 59;
        localStorage.setItem("sessionTimeoutSecond", seconds);
        localStorage.setItem("sessionTimeoutMinute", seconds);
        localStorage.setItem("sessionTimeoutHour", hour);
      }
      else {

        clearInterval(myInterval)
        // logout
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        alert("Session Timeout")
        history.push('/login')
        updateTitle('Login')
        window.location.reload();
      }
    }, 1000)
  }

  useEffect(() => {
    //login state has token
    if (localStorage.getItem(ACCESS_TOKEN_NAME))
      setTimer(localStorage.getItem("sessionTimeoutHour"), localStorage.getItem("sessionTimeoutMinute"), localStorage.getItem("sessionTimeoutSecond"));
  }, []);
  return (
    <Router history={history}>
      <div className="App">
        <Header title={title} updateTitle={updateTitle} />
        <div className="container">
          <Switch>
            <Route path="/" exact="true" component={() => <LoginForm setTimer={setTimer}  updateTitle={updateTitle} />}>
            </Route>
            <Route path="/register" component={() => <RegistrationForm  updateTitle={updateTitle}/>}>
            </Route>
            <Route path="/login" component={() => <LoginForm setTimer={setTimer}  updateTitle={updateTitle} />}>
            </Route>
            <Route path="/admin" component={() => <HomeAdmin  updateTitle={updateTitle} />}>
            </Route>
            <Route path="/teamMember" component={() => <HomeTeamMember  updateTitle={updateTitle} />}>
            </Route>
            <Route path="/pollCharts" component={() => <PollApexcharts  updateTitle={updateTitle} />}>
            </Route>
            <Route path="/editPollRequest/:pollRequestId" component={() => <ModifyPollRequest  updateTitle={updateTitle} />}>
            </Route>
            
          </Switch> 
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
