/* eslint-disable */
import React from 'react'
import maleUser from '../img/profuser.svg'

export default function Chat({descendingOrderMessages,user}) {

  const id=user.user_id;
  return (
    <div className='h-[70vh] md:w-[50%] overflow-y-auto'>
      {descendingOrderMessages.map((message,_index)=>{
        return (
        <div key={_index}>
              {message.id!==id && <div className='flex flex-row items-center justify-start mt-4'>
                <img src={message.img ? message.img : maleUser} className=' h-12 rounded-full' />
                <div className='ml-2'>
                  <h2 className='text-xs opacity-70'>{message.name}</h2>
                  <h4 className=' text-base pt-1 pb-1 pl-2 pr-2 bg-[#fd2f6e] rounded text-white'>{message.message}</h4>
                </div>
            </div>}
            {message.id===id && <div className='flex flex-row items-center justify-end mt-4'>
                
                <div className='mr-2'>
                  <h2 className='text-xs opacity-70 text-right'>{message.name}</h2>
                  <h4 className=' text-base text-right pt-1 pb-1 pl-2 pr-2 bg-[#FFD9C0] rounded'>{message.message}</h4>
                </div>
                <img src={message.img ? message.img : maleUser} className='h-12 rounded-full' />
            </div>}
          </div>

        )

    })}
    </div>
  )
}
