import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import Chat from './Chat'
import axios from 'axios'

export default function ChatDisplay({user,clickedUser}) {
  const [userMessages,setUserMessages]=useState(null);
  const [clickedUserMessages,setClickedUserMessages]=useState(null);
  const getUserMessages=async()=>{
    try{
      const params = {
      user_id: user.user_id,
      client_user_id: clickedUser.user_id
    }
    const data = await axios.get("http://localhost:8000/messages", {params});
    
    setUserMessages(data.data);
    }catch(err){
      console.log(err);
    }

  }
  const getClickedUserMessages=async()=>{
    try{
      const params = {
      user_id: clickedUser.user_id,
      client_user_id: user.user_id
    }
    const data = await axios.get("http://localhost:8000/messages", {params});
    
    setClickedUserMessages(data.data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getUserMessages();
    getClickedUserMessages();
    

  }, []);
  const messages=[];
  userMessages?.forEach(message=>{
    const formattedMessage={};
    formattedMessage['name']=user?.name;
    formattedMessage['img']=user?.img_url;
    formattedMessage['message']=message.message_data;
    formattedMessage['timestamp']=message.timestamp
    formattedMessage['id']=user.user_id
    messages.push(formattedMessage);
  })
  clickedUserMessages?.forEach(message=>{
    const formattedMessage={};
    formattedMessage['name']=clickedUser?.name;
    formattedMessage['img']=clickedUser?.img_url;
    formattedMessage['message']=message.message_data;
    formattedMessage['timestamp']=message.timestamp
    formattedMessage['id']=clickedUser.user_id
    messages.push(formattedMessage);
  })
  const descendingOrderMessages=messages.sort((a,b)=>a.timestamp.localeCompare(b.timestamp));
  return (
    <div className='h-[80vh] overflow-y-auto w-[100vw] flex flex-col justify-center items-center'>
      <Chat descendingOrderMessages={descendingOrderMessages} clickedUser={clickedUser} user={user}/>
      <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages} />
    </div>
  )
}
