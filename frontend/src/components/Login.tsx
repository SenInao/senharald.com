import "./Login.css"
import axios from "axios";
import React, {useRef} from "react";
import { useContext } from 'react';
import { AuthContext } from "../AuthContext";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authContext  = useContext(AuthContext);

  if (!authContext) {
    throw new Error("authContext missing")
  };

  const {setLogin, setLogout} = authContext;
  const navigate = useNavigate();

  const login = async () => {
    if (!usernameRef.current || !passwordRef.current) {
      console.log("please provide all fields")
      return;
    }

    const jsonData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const response = await axios.post('http://localhost:80/api/user/login', jsonData);
      if (response.data.status) {
        setLogin();
        navigate("/");
      } else {
        setLogout();
        console.log(response.data.message);
      };
    } catch (error) {
      console.log(error);
    };
  };


	return (
		<div className="Loginpage">
      <form className="inputform-container">
        <div className="input-container">
          <label id="username-text-login">Username</label>
          <input type="text" autoComplete="username" ref={usernameRef} id="username-input-login"/>
        </div>

        <div className="input-container">
          <label id="password-text-login">Password</label>
          <input type="password" autoComplete="current-password" ref={passwordRef} id="password-input-login"/>
        </div>
        <button onClick={login} id="login-button">Login</button>
      </form>
		</div>
	);
};

export default Login;
