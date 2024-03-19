import rajeshProfile from "./rajesh.jpg";
import maheshProfile from "./mahesh.jpeg";
import ganeshProfile from "./ganesh.jpg";
import i1 from "./i1.jpeg";
import v1 from "./v1.mp4";
import moment from "moment";
const loggedInUser = {
  name: "rajesh",
  about: "I am using Whatsapp",
  url: rajeshProfile,
  mobile: "mob_rajesh",
};

const users = [
  {
    name: "mahesh",
    about: "No worries",
    url: maheshProfile,
    mobile: "mob_mahesh",
  },
  {
    name: "ganesh",
    about: "In Office",
    url: ganeshProfile,
    mobile: "mob_ganesh",
  },
];

const chats = [
  {
    _id: "id_12345",
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [
      {
        emoji: "x111",
        name: "mob_rajesh",
      },
      {
        emoji: "x222",
        name: "mob_mahesh",
      },
    ],
    pin: false,
    type: "text",
    message: "Hello mahesh",
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "image",
    message: i1,
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "video",
    message: v1,
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "poll",
    message: {
      question: "How are you ?",
      type: "single",
      answers: [
        {
          answer: "Good",
          selectedUsers: ["mob_rajesh", "mob_rajesh"],
        },
        {
          answer: "Bad",
          selectedUsers: ["mob_rajesh", "mob_rajesh"],
        },
      ],
    },
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "poll",
    message: {
      question: "Choose fav. artist !",
      type: "multi",
      answers: [
        {
          answer: "Justin",
          selectedUsers: ["mob_rajesh", "mob_rajesh"],
        },
        {
          answer: "Weeknd",
          selectedUsers: ["mob_rajesh", "mob_rajesh"],
        },
      ],
    },
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "reply",
    chatId: "id_12345",
    message: "nice",
    updatedAt: moment().add(Math.floor(Math.random() * 10), "days"),
  },
];
const data = {
  users,
  loggedInUser,
  chats,
};
export default data;
