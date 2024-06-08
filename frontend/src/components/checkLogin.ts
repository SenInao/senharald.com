import axios from "axios";

export async function checkLogin() {
  try {
    const response = await axios.get("http://localhost:80/api/user/");
    if (response.data.status) {
      return {success: true, user:response.data.user};
    } else {
      return {success: false, message:response.data.message};
    };
  } catch (error) {
    return {success: false, message:"axios error", error: error};
  };
};
