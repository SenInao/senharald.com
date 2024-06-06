import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadProfilePic.css"

const UploadProfilePic:React.FC = () => {
  const navigate = useNavigate();



  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/user/");
      if (response.data.status) {
        return;
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = async () => {
    if (fileInputRef.current?.files?.length) {
      const formData = new FormData();
      const file = fileInputRef.current.files[0];
      formData.append("profile", file);


      if (!file.name.includes(".png") && !file.name.includes(".jpeg") && !file.name.includes(".jpg")) {
        console.log("png, jpeg or jpg")
        return;
      };

      try {

        const response = await axios.post("http://localhost:80/api/user/profile-photo-upload", formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        });

        if (response.data.status) {
          navigate("/profile")
        } else {
          console.log(response.data.message)
        };
      } catch (error) {
        console.log(error);
      };
    };
  };


  return (
    <div className="UploadProfilePicPage">
      <div className="upload-container">
        <h1>Upload Profile Picture</h1>
        <input ref={fileInputRef} type="file"/>
        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadProfilePic;
