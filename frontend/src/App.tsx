import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import "./App.css"

function App() {
  return (
    <div className="App">
		<Navbar/>
		<Router>
			<Routes>
				<Route path="/" element={<Homepage/>}/>
				<Route path="/login" element={<Login/>}/>
			</Routes>
		</Router>
	</div>
  );
};

export default App;
