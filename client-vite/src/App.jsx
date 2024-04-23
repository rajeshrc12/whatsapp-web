import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const res = axios
      .post(`${import.meta.env.VITE_SERVER_API_URL}/`, {
        name: "rajesh",
      })
      .then((res) => console.log("client", res.data));
  });
  return (
    <div>
      <div>VITE_SERVER_API_URL {import.meta.env.VITE_SERVER_API_URL}</div>
      <div>VITE_GOOGLE_ID {import.meta.env.VITE_GOOGLE_ID}</div>
    </div>
  );
};

export default App;
