import { useState } from "react";
import firebase from 'firebase/compat/app';


const Login = ({ setUser, setAuthMessage }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  
    const login = async () => {
      firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          setAuthMessage(error.message);
        });
    };
  
    return (
      <div>
        <h3> Login </h3>
        <input
          placeholder="Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login</button>
      </div>
    );
  };

  export default Login;