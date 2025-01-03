import React from "react";
import "../App.css";
import Signupsignin from "../Component/SignupSignin";
import Header from "../Component/Header";

const Signup = () => {
  return (
    <>
      <div>
        <Header />
        <div className="wrapper">
          <Signupsignin />
        </div>
      </div>
    </>
  );
};

export default Signup;
