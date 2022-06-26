/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import ProfileCard from "../components/ProfileCard";

export default function Dashboard({ user, setCurUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies["UserId"],
      };
      const data = await axios.get("https://codevv.herokuapp.com/users/users", {
        params,
      });
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUsers(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [cookies["UserId"]]);

  const handleMatch = async (id) => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: id,
      };
      const data = await axios.put(
        `http://localhost:8000/users/match`,
        {},
        { params }
      );
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleReject = async (id) => {
    try {
      const params = {
        user_id: cookies["UserId"],
        clicked_user_id: id,
      };
      const data = await axios.put(
        `http://localhost:8000/users/reject`,
        {},
        { params }
      );
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(users)
  if (!users) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className=" flex flex-col snap-y overflow-y-scroll lg:snap-x snap-mandatory lg:flex-row lg:overflow-x-scroll">
      {users.map((user, _index) => (
        <ProfileCard
          user={user}
          setCurUser={setCurUser}
          key={_index}
          handleMatch={handleMatch}
          handleReject={handleReject}
        />
      ))}
    </div>
  );
}
