/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import maleUser from "../img/profuser.svg";

export default function MatchesDisplay({ setClickedUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies["UserId"],
      };
      const data = await axios.get(
        "https://codevv.herokuapp.com/users/matched",
        { params }
      );
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUsers(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, []);
  //   console.log(users);
  if (!users) {
    return <p>Loading</p>;
  }

  return (
    <div className="h-[100vh] overflow-y-auto flex flex-col items-center mt-6">
      {users.map((user, _index) => (
        <div className="flex flex-col items-center justify-center" key={_index}>
          <div className="flex flex-row items-center justify-between h-16 w-[340px] md:w-[420px]">
            <div className="h-[100%] flex flex-row items-center justify-center ml-4">
              <img
                src={user.img_url ? user.img_url : maleUser}
                className="h-[70%] rounded-full cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${user.user_id}`);
                }}
              />
              <div className="ml-2">
                <h2 className="text-base">{user.name}</h2>
                <h4 className=" text-xs opacity-70">
                  {user.professional_title}
                </h4>
              </div>
            </div>
            <i
              className="fa-regular fa-comment text-2xl mr-6 opacity-20 cursor-pointer"
              onClick={() => {
                setClickedUser(user);
              }}
            ></i>
          </div>
          <div className=" h-[1px] bg-slate-700 mt-2 mb-2 opacity-20 w-[340px] md:w-[420px]"></div>
        </div>
      ))}
    </div>
  );
}
