import "./Navbar.css"
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';


const Navbar = () => {
    
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
				<ul>
					<button className="navbar-toggle" onClick={toggleMenu}>
						<CgProfile size={50}/>
					</button>
					<li className={isOpen ? "open" : "closed"}><a href="/">Login</a></li>
					<li className={isOpen ? "open" : "closed"}><a href="/">Register</a></li>
					<li className={isOpen ? "open" : "closed"}><a href="/">Profile</a></li>
				</ul>
			</div>
		</nav>
    );
};

export default Navbar;
