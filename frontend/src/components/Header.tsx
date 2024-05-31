import "./Header.css";

const Header = () => {
    const handleButtonClick = () => {
		const targetElement = document.getElementById("homepage-start")
		if (targetElement) {
			targetElement.scrollIntoView();
		};
    };

    return (
        <header>
            <h1>Welcome to senharald.com!</h1>
            <button onClick={handleButtonClick}>↓</button>
        </header>
    );
};

export default Header;
