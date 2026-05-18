import axios from "axios";

const devMode = process.env.NODE_ENV === "development";

// register user
export const registerUser = async (userData) => {
  if (devMode) console.log("======== REGUSTER USER ========", userData);
  try {
    const response = await axios.post("/api/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    if (devMode) console.log("====== REGISTER ERROR ====== ", error);
    throw error.response?.data || { message: error.message };
  }
};

// login user
export const loginUser = async (credentails) => {
  if (devMode) console.log("======== LOGIN USER ========", credentails);

  try {
    const response = await axios.post("/api/v1/auth/login", credentails);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    if (devMode) console.log("====== LOGIN ERROR ====== ", error);
    throw error.response?.data || { message: error.message };
  }
};

//  will move /api/v1/auth/me to authReducer
