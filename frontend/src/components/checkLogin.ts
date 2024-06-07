import axios from "axios";

export async function checkLogin() {
  try {
    const response = await axios.get("/api/user/");
    if (response.data.status) {
      return {success: true, user:response.data.user};
    } else {
      return {success: false, message:response.data.message};
    };
  } catch (error) {
    return {success: false, message:"axios error", error: error};
  };
};
