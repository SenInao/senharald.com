import "./Login.css"
import axios from "axios";
import React, {useRef, useState} from "react";
import { useContext } from 'react';
import { AuthContext } from "../AuthContext";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waitingRef = useRef<HTMLLabelElement>(null);
  const errorRef = useRef<HTMLLabelElement>(null);
  const authContext  = useContext(AuthContext);

  if (!authContext) {
    throw new Error("authContext missing")
  };

  const {setLoggedIn, setUser} = authContext;
  const [loginError, setError] = useState(String);
  const navigate = useNavigate();

  const login = async () => {
    if (!usernameRef.current || !passwordRef.current || !buttonRef.current || !waitingRef.current || !errorRef.current) {
      return;
    }

    const jsonData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    try {
      buttonRef.current.style.display = "none"; 
      buttonRef.current.style.animation = "none";
      waitingRef.current.style.display = "block";

      const response = await axios.post('/api/user/login', jsonData);

      buttonRef.current.style.display = "block";
      waitingRef.current.style.display = "none";

      if (response.data.status) {
        setLoggedIn(true);
        setUser(response.data.user);
        navigate("/profile");
      } else {
        errorRef.current.style.display = "block";
        setError(response.data.message);
      };
    } catch (error) {
      errorRef.current.style.display = "block";
      setError("Server error")
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

	return (
		<div className="Loginpage">
      <form onSubmit={handleSubmit} className="inputform-container">
        <label id="errorLabel" ref={errorRef}>{loginError}</label>
        <div className="input-container">
          <label id="username-text-login">Username</label>
          <input type="text" autoComplete="username" ref={usernameRef} id="username-input-login"/>
        </div>

        <div className="input-container">
          <label id="password-text-login">Password</label>
          <input type="password" autoComplete="current-password" ref={passwordRef} id="password-input-login"/>
        </div>
        <button onClick={login} ref={buttonRef} id="login-button">Login</button>
        <label id="waiting" ref={waitingRef}>Checking ...</label>
      </form>
		</div>
	);
};

export default Login;
