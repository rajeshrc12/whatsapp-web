import rajeshProfile from "./rajesh.jpg";
import maheshProfile from "./mahesh.jpeg";
import ganeshProfile from "./ganesh.jpg";
import i1 from "./i1.jpeg";
import i2 from "./i2.jpeg";
import v1 from "./v1.mp4";
import v2 from "./v2.mp4";
import moment from "moment";
const loggedInUser = {
  name: "rajesh",
  about: "I am using Whatsapp",
  url: maheshProfile,
  mobile: "mob_rajesh",
};

const images = [
  { type: "image", message: rajeshProfile },
  { type: "image", message: maheshProfile },
  { type: "image", message: ganeshProfile },
  { type: "image", message: i1 },
  { type: "image", message: i2 },
  { type: "video", message: v1 },
  { type: "video", message: v2 },
];
const videos = [v1];
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
    updatedAt: "31/12/2024",
  },
  {
    _id: "id_12345",
    from: "mob_mahesh",
    to: "mob_rajesh",
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
    message: `In literary theory, a text is any object that can be "read", whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a coherent set of signs that transmits some kind of informative message.[1] This set of signs is considered in terms of the informative message's content, rather than in terms of its physical form or the medium in which it is represented.

    Within the field of literary criticism, "text" also refers to the original information content of a particular piece of writing; that is, the "text" of a work is that primal symbolic arrangement of letters as originally composed, apart from later alterations, deterioration, commentary, translations, paratext, etc. Therefore, when literary criticism is concerned with the determination of a "text", it is concerned with the distinguishing of the original information content from whatever has been added to or subtracted from that content as it appears in a given textual document (that is, a physical representation of text).
    
    Since the history of writing predates the concept of the "text", most texts were not written with this concept in mind. Most written works fall within a narrow range of the types described by text theory. The concept of "text" becomes relevant if and when a "coherent written message is completed and needs to be referred to independently of the circumstances in which it was created."[citation needed]`,
    updatedAt: "31/12/2024",
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "image",
    message: i1,
    updatedAt: "31/12/2024",
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "image",
    message: i2,
    updatedAt: "31/12/2024",
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "video",
    message: v1,
    updatedAt: "30/12/2024",
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
          selectedUsers: [
            { name: "mob_rajesh", emoji: ":D" },
            { name: "mob_mahesh", emoji: ":D" },
            { name: "mob_ganesh", emoji: ":/" },
          ],
        },
        {
          answer: "Bad",
          selectedUsers: [{ name: "mob_mahesh", emoji: ":D" }],
        },
      ],
    },
    updatedAt: "30/12/2024",
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
      type: "multiple",
      answers: [
        {
          answer: "Justin",
          selectedUsers: [
            { name: "mob_rajesh", emoji: ":D" },
            { name: "mob_mahesh", emoji: ":D" },
          ],
        },
        {
          answer: "Weeknd",
          selectedUsers: [{ name: "mob_mahesh", emoji: ":D" }],
        },
      ],
    },
    updatedAt: "30/12/2024",
  },
  {
    _id: "id" + Math.floor(Math.random() * 10000),
    from: "mob_rajesh",
    to: "mob_mahesh",
    reactions: [],
    pin: false,
    type: "reply",
    message: {
      type: "text",
      message: "Hello",
    },
    updatedAt: "30/12/2024",
  },
];
const data = {
  users,
  loggedInUser,
  chats,
  images,
  videos,
};
export default data;
