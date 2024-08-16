import axios from "axios";
import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadProfilePic.css"
import { AuthContext } from "../AuthContext";
import { parentDomain } from "../constants";

const UploadProfilePic:React.FC = () => {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("context missing")

  const {loggedIn} = auth


  useEffect(()=> {
    if (!loggedIn) {
      navigate("/login")
    }
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorLabelRef = useRef<HTMLLabelElement>(null);
  const checkingLabelRef = useRef<HTMLLabelElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayMessage = (ref:React.RefObject<HTMLElement>, msg:string) => {
    if (ref.current) {
      ref.current.style.display = "block";
      ref.current.textContent = msg;
    };
  };

  const upload = async () => {
    if (fileInputRef.current?.files?.length) {
      
      if (errorLabelRef.current) {
        errorLabelRef.current.style.display = "none";
      };

      const formData = new FormData();
      const file = fileInputRef.current.files[0];
      formData.append("profile", file);


      if (!file.name.includes(".png") && !file.name.includes(".jpeg") && !file.name.includes(".jpg")) {
        displayMessage(errorLabelRef, "File needs to be png, jpeg or jpg");
        if (checkingLabelRef.current && buttonRef.current) {
          checkingLabelRef.current.style.display = "none";
          buttonRef.current.style.display = "block";
        };
        return;
      };

      try {
        if (checkingLabelRef.current && buttonRef.current) {
          checkingLabelRef.current.style.display = "block";
          buttonRef.current.style.display = "none";
        }
        const response = await axios.post(parentDomain+"/api/user/profile-photo-upload", formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        });

        if (response.data.status) {
          navigate("/profile")
        } else {
          displayMessage(errorLabelRef, response.data.message);
        };
      } catch (error) {
        displayMessage(errorLabelRef, "Server error");
      };
    } else {
      displayMessage(errorLabelRef, "Please select a file");
    };
    if (checkingLabelRef.current && buttonRef.current) {
      checkingLabelRef.current.style.display = "none";
      buttonRef.current.style.display = "block";
    };
  };

  return (
    <div className="UploadProfilePicPage">
      <div className="upload-container">
        <h1>Upload Profile Picture</h1>
        <label ref={errorLabelRef} id="error-label">Error</label>
        <input ref={fileInputRef} type="file"/>
        <button ref={buttonRef} onClick={upload}>Upload</button>
        <label ref={checkingLabelRef} id="checking-label">Checking ...</label>
      </div>
    </div>
  );
};

export default UploadProfilePic;
