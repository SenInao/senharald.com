import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UploadProfilePic from "./components/UploadProfilePic";
import "./App.css"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error("Context missing")

  const {loading} = authContext

  if (loading) {
    return <div className="App"></div>
  }

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/upload-picture" element={<UploadProfilePic/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
