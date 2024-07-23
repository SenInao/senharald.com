import axios from "axios";
import { parentDomain } from "../constants";

export async function checkLogin() {
  try {
    const response = await axios.get(parentDomain+"/api/user/");
    if (response.data.status) {
      return {success: true, user:response.data.user};
    } else {
      return {success: false, message:response.data.message};
    };
  } catch (error) {
    return {success: false, message:"axios error", error: error};
  };
};
