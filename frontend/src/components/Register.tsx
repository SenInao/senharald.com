import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  return (
		<div className="Registerpage">
      <div className="inputform-container">
        <div className="input-container">
          <label id="fullname-text-register">Fullname</label>
          <input type="text" id="fullname-input-register"/>
        </div>

        <div className="input-container">
          <label id="email-text-register">Email</label>
          <input type="text" id="email-input-register"/>
        </div>

        <div className="input-container">
          <label id="username-text-register">Username</label>
          <input type="text" id="username-input-register"/>
        </div>

        <div className="input-container">
          <label id="password-text-register">Password</label>
          <input type="password" id="password-input-register"/>
        </div>
        <button id="register-button">Register</button>
      </div>
		</div>
	);
};

export default Register;
