import React from "react";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  return (
    <div className="App">
		<React.StrictMode>
			<Navbar/>
		</React.StrictMode>
		<header>
			<h1>Welcome to senharald.com!</h1>
		</header>
	</div>
  );
};

export default App;
