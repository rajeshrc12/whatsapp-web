import React from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className='relative'>
        <input type="text" placeholder='Search or start new' className='outline-none bg-[#f0f2f5] h-full w-full py-2 pl-10 rounded-lg'/>
        <div className='absolute top-1 left-1'>
        <IoMdSearch size={20} color='#54656f' />
        </div>
    </div>
  )
}

export default SearchBar