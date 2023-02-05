import { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginInput = ({ setUser, setError }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code);
        setError(error);
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

export default LoginInput;
