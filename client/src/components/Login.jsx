import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
useEffect(()=>{
    if(sessionStorage.getItem("whatsappUser")){
      navigate("/home")
    }
  },[])
  return (
    <div className="flex h-screen justify-center items-center">
      <div className=" border border-black w-[30vw] p-5 bg-[#f0f2f5] text-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const user=e.target[0].value.trim();
            if(user){
              const resp = await axios.post("http://localhost:3001",{
                  user
              });
              navigate("/home");
              sessionStorage.setItem("whatsappUser", user);
              alert(resp.data);
            }
            else{
              alert("enter name")
            }
          }}
        >
          <input
            type="text"
            name="user"
            className="w-full outline-none border border-black"
          />
          <button className="px-2 m-5 border border-black">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
