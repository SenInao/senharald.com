import React from "react";
import Header from "./components/Navbar";
import "./App.css"

function App() {
  return (
    <div className="App">
		<React.StrictMode>
			<Header/>
		</React.StrictMode>
	</div>
  );
};

export default App;
