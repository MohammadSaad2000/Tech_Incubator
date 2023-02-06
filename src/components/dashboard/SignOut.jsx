import React from "react";

const SignOut = ({ user, logout }) => {
  return (
    <div>
      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
};

export default SignOut;
