import { useState } from "react";
import firebase from 'firebase/compat/app';

const Register = ({ setUser, setAuthMessage }) => {
    const [companyName, setCompanyName] = useState(null);
    const [userType, setUserType] = useState("student");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  
    const register = async () => {

      firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then((user) => {
          console.log(user);
          setUser(user);
        })
        .catch((error) => {
          setAuthMessage(error.message);
        });

    };


    function getCompanyNameInput(){
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
        <select name="userType" id="userType"
          onClick={(event) => {
            setUserType(event.target.value);
          }}>
          <option value="student">Student</option>
          <option value="company">Company Manager</option>
        </select>
        {getCompanyNameInput()}
        <button onClick={register}>Create User</button>
      </div>
    );
  };

  export default Register;

