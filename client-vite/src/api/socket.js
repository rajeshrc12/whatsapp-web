import axios from "axios";
export const logout = async ({ name = "" }) => {
  try {
    if (name) {
      const result = await axios.get(`http://localhost:3001/logout/${name}`);
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getOnlineUsers = async () => {
  try {
    const result = await axios.get(`http://localhost:3001/getonlineuser`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};
