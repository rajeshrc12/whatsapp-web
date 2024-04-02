import axios from "axios";
export const setChats = async (chat = []) => {
  try {
    if (chat.length) {
      const result = await axios.post(`http://localhost:3001/chat`, {
        chat,
      });
      return result;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChats = async (name = "") => {
  try {
    if (name) {
      const result = await axios.get(`http://localhost:3001/chat/${name}`);
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
