import { AuthContext } from "../AuthContext";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Profile.css";

interface User {
  fullname: string;
  username: string;
  email: string;
};

const Profile: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const fullnameTextRef = useRef<HTMLLabelElement>(null);
  const fullnameInputRef = useRef<HTMLInputElement>(null);
  const fullnameButtonRef = useRef<HTMLButtonElement>(null);

  const usernameTextRef = useRef<HTMLLabelElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const usernameButtonRef = useRef<HTMLButtonElement>(null);

  const emailTextRef = useRef<HTMLLabelElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailButtonRef = useRef<HTMLButtonElement>(null);

  if (!authContext) {
    throw new Error("authContext missing")
  };

  const {user, setUser} = authContext;
  const [usernameConfirm, setUsernameConfirm] = useState(false);
  const [fullnameConfirm, setFullnameConfirm] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user/");
      if (response.data.status) {
        setUser(response.data.user);
      } else {
        navigate("/login")
      };
    } catch (error) {
      return;
    };
  };


  useEffect(()=> {
    getUser();
  });

  const updateProfile = async (user:User) => {
    try {
      const response = await axios.post("/api/user/update", user);

      if (response.data.status) {
        setUser(response.data.user);
      } else {
        setUser(null);
        return;
      };
    } catch (error) {
      return;
    };
  };

  const changeProperty = async (
    property: keyof User, 
    textRef: React.RefObject<HTMLLabelElement>, 
    inputRef: React.RefObject<HTMLInputElement>, 
    buttonRef: React.RefObject<HTMLButtonElement>, 
    confirmButton: boolean, 
    setConfirmButton: React.Dispatch<React.SetStateAction<boolean>> ) => {
    if (!textRef.current || !inputRef.current || !buttonRef.current || !user) {
      return;
    };

    if (confirmButton) {
      const jsonData = {
        ...user,
        [property]: inputRef.current.value,
      };

      await updateProfile(jsonData);

      textRef.current.style.display = "inline";
      inputRef.current.style.display = "none";
      buttonRef.current.textContent = "Change";

      setConfirmButton(false);
    } else {
      textRef.current.style.display = "none";
      inputRef.current.style.display = "inline";
      buttonRef.current.textContent = "Confirm";

      setConfirmButton(true);
    };
  };

  return (
    <div className="Profilepage">
      <div className="profile-container">

        <div className="info-container">
          <div>
            <label>Name: </label>
            <label className="info-label" ref={fullnameTextRef}>{user?.fullname}</label>
            <input ref={fullnameInputRef} type="text" className="change-input" defaultValue={user?.fullname}/>
          </div>
          <button ref={fullnameButtonRef} className="change-button" onClick={() => {changeProperty("fullname", fullnameTextRef, fullnameInputRef, fullnameButtonRef, fullnameConfirm, setFullnameConfirm)}}>Change</button>
        </div>

        <div className="info-container">
          <div>
            <label>Username: </label>
            <label ref={usernameTextRef} className="info-label" >{user?.username}</label>
            <input ref={usernameInputRef} type="text" className="change-input" defaultValue={user?.username}/>
          </div>
          <button ref={usernameButtonRef} className="change-button" onClick={()=>{changeProperty("username", usernameTextRef, usernameInputRef, usernameButtonRef, usernameConfirm, setUsernameConfirm)}}>Change</button>
        </div>

        <div className="info-container">
          <div>
            <label>Email: </label>
            <label ref={emailTextRef} className="info-label" >{user?.email}</label>
            <input ref={emailInputRef} type="text" className="change-input" defaultValue={user?.email}/>
          </div>
          <button ref={emailButtonRef} className="change-button" onClick={()=>{changeProperty("email", emailTextRef, emailInputRef, emailButtonRef, emailConfirm, setEmailConfirm)}}>Change</button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
