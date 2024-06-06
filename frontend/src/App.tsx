import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UploadProfilePic from "./components/UploadProfilePic";
import "./App.css"

function App() {
  return (
    <div className="App">
		<Navbar/>
		<Router>
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
