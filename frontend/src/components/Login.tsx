import "./Login.css"

const Login = () => {
	return (
		<div className="Loginpage">
      <div className="inputform-container">
        <div className="input-container">
          <label id="username-text">Username</label>
          <input type="text" id="username-input"/>
        </div>

        <div className="input-container">
          <label id="password-text">Password</label>
          <input type="text" id="password-input"/>
        </div>
        <button>Login</button>
      </div>
		</div>
	);
};

export default Login;
