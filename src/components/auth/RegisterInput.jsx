import { useState } from "react";
import { auth, db } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addStudentDB, addCompanyDB } from "../../firestore-utilities";

const RegisterInput = ({ setUser, setError }) => {
  const [companyName, setCompanyName] = useState(null);
  const [userType, setUserType] = useState("student");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        setUser(userCredential.user);
        if (userType === "company") {
          addCompanyDB(userCredential.user, companyName);
        } else {
          addStudentDB(userCredential.user);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  function getCompanyNameInput() {
    if (userType === "company") {
      return (
        <input
          placeholder="Company Name"
          onChange={(event) => {
            setCompanyName(event.target.value);
          }}
        />
      );
    }

    return null;
  }

  return (
    <div>
      <h3> Register User </h3>
      <input
        placeholder="Email"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <label htmlFor="userType">User Type:</label>
      <select
        name="userType"
        id="userType"
        onClick={(event) => {
          setUserType(event.target.value);
        }}
      >
        <option value="student">Student</option>
        <option value="company">Company Manager</option>
      </select>
      {getCompanyNameInput()}
      <button onClick={register}>Create User</button>
    </div>
  );
};

export default RegisterInput;
