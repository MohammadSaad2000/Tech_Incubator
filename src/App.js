import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        sessionStorage.setItem("loggedIn", true);
      } else {
        sessionStorage.removeItem("loggedIn");
      }
      setUser(currentUser);
    });

    let isLoggedIn = sessionStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AuthPage setUser={setUser} setError={setError} error={error} />
          }
        />
        <Route
          path="/dashboard"
          element={<StudentDashboard user={user} logout={logout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
