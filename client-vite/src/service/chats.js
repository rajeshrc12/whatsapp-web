import axios from "axios";
export const sendChat = async ({ from, to, chat }) => {
  try {
    const result = await axios.post(`http://localhost:3001/chat`, {
      from,
      to,
      chat,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
