import axios from "axios";
import React, {useContext, useRef} from "react";
import { AuthContext } from "../AuthContext";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const fullnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("missing authContext");
  };

  const {setLogin, setLogout} = authContext;
  const navigate = useNavigate();


  const register = async () => {
    if (!fullnameRef.current || !usernameRef.current || !emailRef.current || !passwordRef.current) {
      console.log("fields required");
      return;
    };

    const jsonData = {
      fullname:fullnameRef.current.value,
      email:emailRef.current.value,
      username:usernameRef.current.value,
      password:passwordRef.current.value
    };


    try {
      const response = await axios.post("http://localhost:80/api/user/register", jsonData);
      if (response.data.status) {
        setLogin();
        navigate("/");
      } else {
        console.log(response.data.message);
      };
    } catch (error) {
      console.log(error);
    };
  };

  return (
		<div className="Registerpage">
      <form className="inputform-container">
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
        <button id="register-button" onClick={register}>Register</button>
      </form>
		</div>
	);
};

export default Register;
