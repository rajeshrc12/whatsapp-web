import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const addUser = async ({ email, name, profileImageUrl }) => {
  try {
    const response = await axios.post(`${serverUrl}/user`, {
      email,
      name,
      profileImageUrl,
    });
    console.log("src/service/user/(addUser)", response);
  } catch (error) {
    console.log("error src/service/user/(addUser)", error);
  }
};
export const getOnlineUsers = async () => {
  try {
    const response = await axios.get(`${serverUrl}/onlineusers`);
    console.log("src/service/user/(getOnlineUsers)", response);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(getOnlineUsers)", error);
  }
};
