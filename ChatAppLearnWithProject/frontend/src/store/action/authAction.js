import axios from "axios";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/messenger/user-register",
        data,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
};
