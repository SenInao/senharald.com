import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import "./App.css"

function App() {
  return (
    <div className="App">
		<React.StrictMode>
			<Navbar/>
			<Header/>
			<Homepage/>
		</React.StrictMode>
	</div>
  );
};

export default App;
