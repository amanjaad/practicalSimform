import axios from "axios";

const url = "http://localhost:8000";

export const registration = async (user) => {
    try {
      return await axios.post(`${url}/signup`, user);
    } catch (error) {
      console.log("error while calling signup api", error);
    }
  };

  export const userSignIn = async (user) => {
    try {
      return await axios.post(`${url}/signIn` , user)
    } catch (error) {
      console.log("error while calling signup api", error);
    }
  }
  export const updateUser = async (_id , user) => {
    try {
      return await axios.patch(`${url}/updateUser/${_id}`,user);
    } catch (error) {
      console.log("error while calling signup api", error); 
    }
  }