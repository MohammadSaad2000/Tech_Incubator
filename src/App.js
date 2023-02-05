import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from './firebase-config';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element ={<LoginPage setUser={setUser} />}/>
            <Route path="/dashboard" element ={<Dashboard user={user}/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
