import { CgProfile } from "react-icons/cg";
import { useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import "./Navbar.css"
import axios from "axios";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("authcontext error!")
  };

  const {loggedIn, setLoggedIn, setUser} = authContext;

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		console.log("button")
		setIsOpen(!isOpen);
	};

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:80/api/user/logout');
      if (response.data.status) {
        setLoggedIn(false);
        setUser(null);
      } else {
        console.log(response.data.message);
        setLoggedIn(false);
        setUser(null);
      };
    } catch (error) {
      console.log("error!")
    };
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
					  <li className={isOpen ? "open" : "closed"}><a href="/profile">Profile</a></li>
					  <li className={isOpen ? "open" : "closed"}><a href="/" onClick={logout}>Logout</a></li>
          </ul>
        ) : (
          <ul>
					  <button className="navbar-toggle" onClick={toggleMenu}>
						  <CgProfile size={50}/>
					  </button>
					  <li className={isOpen ? "open" : "closed"}><a href="/login">Login</a></li>
					    <li className={isOpen ? "open" : "closed"}><a href="/register">Register</a></li>
          </ul>
        )}
			</div>
		</nav>
  );
};

export default Navbar;
