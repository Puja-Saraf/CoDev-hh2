import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies['UserId'],
        requested_id: cookies['UserId'],
        token: cookies['AuthToken'],
      }
      const data = await axios.get("http://localhost:8000/users/user", {params});
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUser(data.data);
      }
    }
    fetchData()
      .catch(console.error);

    return () => isSubscribed = false;
  }, [cookies['UserId']]);
  
  // console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/signup" element={<><Navbar user={user} solid={false} /> {!user &&<Signup />}{user && <Navigate to='/dashboard'/>} </>} />
          <Route path="/login" element={<><Navbar user={user} solid={false} />{!user &&<Login />}{user && <Navigate to='/dashboard'/>} </>} />
          <Route path="/createprofile" element={<><CreateProfile/></>} />
          <Route path="/editprofile" element={<><EditProfile user={user}/></>} />
          <Route path="/profile" element={<><Navbar user={user} solid={true} /><Profile user={user} /></>} />
          <Route path="/dashboard" element={<><Navbar user={user} solid={false} /><Dashboard /></>} />
          {/* <Route exact path="/" element={<LandingPage user={user}/>} />
          {user && <Route exact path="/createprofile" element={<><CreateProfile user={user} edit={false} /></>} />}
          {user && <Route exact path="/editprofile" element={<><CreateProfile user={user} edit={true} /></>} />}
          {user && <Route exact path="/profile" element={<><Navbar user={user} solid={true} /><Profile user={user} /></>} />}
          {user && <Route exact path="/dashboard" element={<><Navbar user={user} solid={false} /><Dashboard /></>} /> }
          {!user && <Route exact path='/signup' element={<><Navbar user={user} solid={false} /> <Signup/></>}/>}
          {!user && <Route exact path='/login' element={<><Navbar user={user} solid={false} /> <Login/></>}/>} */}
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
