import axios from "axios";
export const getUserData = async ({ name = "" }) => {
  try {
    if (name) {
      const result = await axios.post(`http://localhost:3001/${name}`);
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};
