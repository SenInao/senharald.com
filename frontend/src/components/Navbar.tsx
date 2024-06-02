import { CgProfile } from "react-icons/cg";
import { useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import "./Navbar.css"

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("authcontext error!")
  };

  const {loggedIn} = authContext;

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		console.log("button")
		setIsOpen(!isOpen);
	};

  return (
		<nav>
			<div className="sitenav">
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/">About</a></li>
				</ul>
			</div>
			<div className="usernav">
        {loggedIn ? (
          <ul>
					  <button className="navbar-toggle" onClick={toggleMenu}>
						  <CgProfile size={50}/>
					  </button>
					  <li className={isOpen ? "open" : "closed"}><a href="/">Profile</a></li>
					  <li className={isOpen ? "open" : "closed"}><a href="/">Logout</a></li>
          </ul>
        ) : (
          <ul>
					  <button className="navbar-toggle" onClick={toggleMenu}>
						  <CgProfile size={50}/>
					  </button>
					  <li className={isOpen ? "open" : "closed"}><a href="/login">Login</a></li>
					    <li className={isOpen ? "open" : "closed"}><a href="/">Register</a></li>
          </ul>
        )}
			</div>
		</nav>
  );
};

export default Navbar;
