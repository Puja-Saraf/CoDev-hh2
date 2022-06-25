import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Oval } from 'react-loader-spinner'
import ProfileCard from '../components/ProfileCard'

export default function Dashboard() {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies['UserId'],
      }
      const data = await axios.get("http://localhost:8000/users/users", { params });
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUsers(data.data);
      }
    }
    fetchData()
      .catch(console.error);

    return () => isSubscribed = false;
  }, [cookies['UserId']]);

  // console.log(users)
  if (!users) {
    return <div className='flex justify-center items-center h-[100vh]'><Oval color="#fd2f6e" height={80} width={80} /></div>
  }

  return (
    <div className=' flex flex-col snap-y overflow-y-scroll md:snap-x snap-mandatory md:flex-row md:overflow-x-scroll'>
      {users.map((user,_index)=>(<ProfileCard user={user} key={_index}/>))}
    </div>
  )
}
