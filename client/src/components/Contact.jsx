import React from 'react'
import ProfileImg from "../images/profile.png";

const Contact = () => {
  return (
    <div className='grid grid-cols-5 items-center text-xs'>
        <div className='flex col-span-1 justify-center'>
        <img src={ProfileImg} className='rounded-[5rem]' height={45} width={45} />
        </div>
        <div className='col-span-4 border-[#e9edef] border-t-[1px] py-4 px-2'>
            <div className='flex justify-between'>
                <div>
                    Rajesh
                </div>
                <div>
                    2023-12-12
                    </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    Rajesh
                </div>
                <div>
                    2023-12-12
                    </div>
            </div>
</div>
    </div>
  )
}

export default Contact