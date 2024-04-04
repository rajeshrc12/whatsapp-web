import axios from "axios";
export const sendChat = async ({ from, to, chat }) => {
  try {
    await axios.post(`http://localhost:3001/chat`, {
      from,
      to,
      chat,
    });
  } catch (error) {
    console.log(error);
  }
};
