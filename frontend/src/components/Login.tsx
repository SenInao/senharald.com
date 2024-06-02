import "./Login.css"
import axios from "axios";
import React, {useRef} from "react";

const Login: React.FC = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
        console.log("logged in!");
        console.log(response.data.user)
      } else {
        console.log(response.data.message)
      };
    } catch (error) {
      console.log("error!")
    };
  };


	return (
		<div className="Loginpage">
      <div className="inputform-container">
        <div className="input-container">
          <label id="username-text">Username</label>
          <input type="text" ref={usernameRef} id="username-input"/>
        </div>

        <div className="input-container">
          <label id="password-text">Password</label>
          <input type="text" ref={passwordRef} id="password-input"/>
        </div>
        <button onClick={login}>Login</button>
      </div>
		</div>
	);
};

export default Login;
