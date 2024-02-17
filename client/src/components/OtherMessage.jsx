import React from 'react'
import ProfileImg from "../images/profile.png";

const Message = () => {
  return (
    <div className='flex text-xs my-3 gap-3'>
        <div>
        <img src={ProfileImg} className='rounded-2xl' height={35} width={35} />
        </div>
        <div className='border bg-white w-[40vw] rounded-lg break-words p-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, voluptates suscipit ipsam nostrum porro at sapiente temporibus? Molestias magni quia dolorem accusamus, dolores laboriosam distinctio inventore quisquam delectus mollitia consequatur.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo voluptatum incidunt maiores. Neque repellendus aut totam fugiat impedit possimus voluptate sint quae, voluptas, odit voluptates id labore quisquam, repudiandae doloribus!
            </div>
    </div>
  )
}

export default Message