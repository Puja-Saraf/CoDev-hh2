import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileCard({user}) {
  const navigate=useNavigate();
    // console.log(user)
    const userAbout=user.about.length>230?user.about.substring(0,230)+'...':user.about
    const handleClick=(user_id)=>{
        navigate(`/profile/${user_id}`)
    }
  return (
    <div onClick={()=>handleClick(user.user_id)} className=' snap-start md:snap-center md:min-w-[100vh] h-[100vh] flex justify-center items-center md:ml-20 md:mr-20'>
    <div className="card bg-white drop-shadow-lg max-w-[360px] md:max-w-[600px] lg:max-w-[700px] h-[80vh] md:h-[60vh] flex flex-row rounded-3xl cursor-pointer">
      <div className="card-text flex flex-col md:grid" style={{gridTemplateColumns: "3fr 5fr"}}>
        <div className="portada w-[100%] h-[100%] rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-tr-none bg-[#fd2f6e] bg-center bg-cover bg-[url('https://bestbuyerpersona.com/wp-content/uploads/2022/02/undraw_profile_pic_ic5t.png')]">
          
        </div>
        <div className="title-total pt-10 pb-6 pr-6 pl-6">
          <div className="title p-4 text-right text-[#fd2f6e] font-semibold text-lg">{user.professional_title}</div>
          <h2 className='m-0 pr-4 pl-4 text-2xl font-bold md:mt-5'>{user.name}</h2>
          <h3 className='m-0 pr-4 pl-4 text-base font-semibold text-[#fd2f6e] md:mt-1'>Work experience: {user.years_of_experience} {user.years_of_experience===1?"year":user.years_of_experience===0?"":"years"}</h3>
          <div className="desc pt-2 pb-2 pr-4 pl-4 text-sm">{userAbout}</div>
          <div className="actions flex flex-row justify-center align-center md:mt-4 lg:mt-6">
          <button className='bg-[#fe5740] pt-2 pb-2 pl-4 pr-4 text-white text-lg rounded-full mr-6'>Pass</button>
        <button className='bg-[#fd2f6e] pt-2 pb-2 pl-4 pr-4 text-white text-lg rounded-full'>Collaborate</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}