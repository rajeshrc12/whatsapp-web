export const sendChat = async ({ from, to, chat }) => {
  try {
    console.log({ from, to, chat });
  } catch (error) {
    console.log(error);
  }
};
