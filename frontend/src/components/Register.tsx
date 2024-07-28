import "./Register.css";
import axios from "axios";
import React, {useContext, useRef, useState} from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { parentDomain } from "../constants";

const Register: React.FC = () => {
  const fullnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waitingRef = useRef<HTMLLabelElement>(null);
  const errorRef = useRef<HTMLLabelElement>(null);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("missing authContext");
  };

  const {setLoggedIn, setUser} = authContext;
  const navigate = useNavigate();

  const search = useLocation().search
  const redirect = new URLSearchParams(search).get("redirect")

  const [registerError, setError] = useState(String);


  const register = async () => {
    if (!fullnameRef.current || !usernameRef.current || !emailRef.current || !passwordRef.current || !buttonRef.current || !waitingRef.current || !errorRef.current) {
      return;
    };

    const jsonData = {
      fullname:fullnameRef.current.value,
      email:emailRef.current.value,
      username:usernameRef.current.value,
      password:passwordRef.current.value
    };


    try {
      buttonRef.current.style.display = "none"; 
      waitingRef.current.style.display = "block"; 
      buttonRef.current.style.animation = "none";

      const response = await axios.post(parentDomain+"/api/user/register", jsonData);

      waitingRef.current.style.display = "none"; 
      buttonRef.current.style.display = "block"; 
      

      if (response.data.status) {
        setLoggedIn(true);
        setUser(response.data.user);
        if (redirect) {
          window.location.href = "https://" + redirect
        }
        navigate("/profile");
      } else {
        errorRef.current.style.display = "block"
        setError(response.data.message);
      };
    } catch (error) {
      errorRef.current.style.display = "block"
      setError("Server error!");
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
		<div className="Registerpage">
      <form className="inputform-container" onSubmit={handleSubmit}>
        <label id="errorLabel" ref={errorRef}>{registerError}</label>
        <div className="input-container">
          <label id="fullname-text-register">Fullname</label>
          <input type="text" ref={fullnameRef} autoComplete="name" id="fullname-input-register"/>
        </div>

        <div className="input-container">
          <label id="email-text-register">Email</label>
          <input type="text" ref={emailRef} autoComplete="email" id="email-input-register"/>
        </div>

        <div className="input-container">
          <label id="username-text-register">Username</label>
          <input type="text" ref={usernameRef} autoComplete="username" id="username-input-register"/>
        </div>

        <div className="input-container">
          <label id="password-text-register">Password</label>
          <input type="password" ref={passwordRef} autoComplete="new-password" id="password-input-register"/>
        </div>
        <button id="register-button" ref={buttonRef} onClick={register}>Register</button>
        <label id="waiting" ref={waitingRef}>Checking ...</label>
      </form>
		</div>
	);
};

export default Register;
