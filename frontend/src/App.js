/* eslint-disable */
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OtherUser from "./pages/OtherUser";
import PendingUsers from "./pages/PendingUsers";
import RejectedUsers from "./pages/RejectedUsers";
import ChatContainer from "./pages/ChatContainer";
import { api } from "./api";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies["UserId"],
        requested_id: cookies["UserId"],
      };
      if(!params.user_id){return  }
      const data = await api.getSelf(params);

      if (isSubscribed) {
        setUser(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [cookies["UserId"]]);

  // console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user && !user.profile_completed && (
            <Route
              path="/dashboard"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route 
              path="/profile" 
              element={<Navigate to="/createprofile" />} />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/editprofile"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/profile/:id"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/chat"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/pendingusers"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/rejectedusers"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && user.profile_completed && (
            <Route
              path="/createprofile"
              element={<Navigate to="/dashboard" />}
            />
          )}
          <Route exact path="/" element={<LandingPage />} />
          <Route
            path="/signup"
            element={
              <>
                <Navbar user={user} solid={false} /> {!user && <Signup />}
                {user && <Navigate to="/dashboard" />}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar user={user} solid={false} />
                {!user && <Login />}
                {user && <Navigate to="/dashboard" />}
              </>
            }
          />
          <Route
            path="/createprofile"
            element={
              <>
                {user && <CreateProfile />}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/editprofile"
            element={
              <>
                {user && <EditProfile user={user} />}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <Profile user={user} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <Dashboard user={user} setCurUser={setUser} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <OtherUser user={user} setCurUser={setUser} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <ChatContainer user={user} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/pendingusers"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <PendingUsers setCurUser={setUser} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route
            path="/rejectedusers"
            element={
              <>
                {user && <><Navbar user={user} solid={true} />
                <RejectedUsers setCurUser={setUser} /></>}
                {!user && <Navigate to='/'/>}
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
