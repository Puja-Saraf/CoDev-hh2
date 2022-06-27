/* eslint-disable */
import { api } from "../api";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import maleUser from "../img/profuser.svg";

export default function List({ user, pending, setCurUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleMatch = async () => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: user.user_id,
      };
      const data = await api.matchUser(params);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleReject = async () => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: user.user_id,
      };
      const data = await api.rejectUser(params);
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnreject = async () => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: user.user_id,
      };
      const data = await api.unrejectUser(params);
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between h-16 w-[340px] md:w-[420px]">
        <div
          className="h-[100%] flex flex-row items-center justify-center cursor-pointer ml-4"
          onClick={() => {
            navigate(`/profile/${user.user_id}`);
          }}
        >
          <img
            src={user.img_url ? user.img_url : maleUser}
            className="h-[70%] rounded-full"
          />
          <div className="ml-2">
            <h2 className="text-base">{user.name}</h2>
            <h4 className=" text-xs opacity-70">{user.professional_title}</h4>
          </div>
        </div>
        {pending && (
          <button
            className="bg-[#fd2f6e] pt-1 pb-1 pl-3 pr-3 text-white text-base rounded-full ml-14 mr-2"
            onClick={handleMatch}
          >
            Accept
          </button>
        )}
        {pending && (
          <button
            className="bg-[#fd2f6e] pt-1 pb-1 pl-3 pr-3 text-white text-base rounded-full"
            onClick={handleReject}
          >
            Delete
          </button>
        )}
        {!pending && (
          <button
            className="bg-[#fd2f6e] pt-1 pb-1 pl-3 pr-3 text-white text-base rounded-full mr-6"
            onClick={handleUnreject}
          >
            Revert
          </button>
        )}
      </div>
      <div className=" h-[1px] bg-slate-700 mt-2 mb-2 opacity-20 w-[340px] md:w-[420px]"></div>
    </div>
  );
}
