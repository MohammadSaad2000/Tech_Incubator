import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';

function App() {

  const [authMessage, setAuthMessage] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser !== null) {
        sessionStorage.setItem('loggedIn', true);
      } else {
        sessionStorage.removeItem('loggedIn');
      }
      setUser(currentUser);
    });

    let isLoggedIn = sessionStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<ErrorPage setUser={setUser} setAuthMessage={setAuthMessage} authMessage={authMessage} />}/>
        <Route path="/dashboard" element ={<Dashboard user={user} logout={logout}/>}/>
      </Routes>
    </div>
  );
}

export default App;
