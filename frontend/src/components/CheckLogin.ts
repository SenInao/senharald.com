import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const CheckLogin = async () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return false;
  };

  const {setUser, setLoggedIn} = authContext;

  try {
    const response = await axios.get("http://localhost:80/api/user/");
    if (response.data.status) {
      setUser(response.data.user);
      setLoggedIn(true);
      return true;
    } else {
      setUser(null);
      setLoggedIn(false);
      return false;
    };
  } catch (error) {
    return false;
  };
};

export default CheckLogin;
