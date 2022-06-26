import axios from 'axios';
import React, { useState } from 'react'

export default function ChatInput({user,clickedUser,getUserMessages,getClickedUserMessages}) {
  const [textArea, setTextArea] =useState('')
  const userId=user?.user_id;
  const clickUserId=clickedUser?.user_id;

  const addMessage=async()=>{
    if(textArea.trim().length===0){
      return;
    }
    const message={
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickUserId,
      message_data: textArea 
    }

    try{
      await axios.put('http://localhost:8000/messages',{message});
      getUserMessages();
      getClickedUserMessages();
      setTextArea('');
    }catch(e){
      console.log(e)
    }

  }

  return (
    <div className='flex flex-row justify-center mt-7 items-center'>
      <textarea value={textArea} onChange={(e)=>setTextArea(e.target.value)} className='border-2 border-slate-700 rounded-xl text-base w-56 md:w-96 h-12 resize-none'/>
      <button onClick={addMessage} className='text-white bg-gradient-to-r from-[#fd2f6e] to-[#fe5740] px-2 py-1 md:px-3 md:py-2 m-2 rounded-full font-semibold w-fit text-lg md:text-xl cursor-pointer hover:from-[#FFD9C0] hover:to-[#FFD9C0] hover:text-[#fe5740]'><i className="fa-solid fa-paper-plane"></i></button>
    </div>
  )
}
