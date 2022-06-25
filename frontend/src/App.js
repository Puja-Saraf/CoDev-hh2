import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={ <LandingPage/> } />
            <Route path="/signup" element={ <><Navbar/><Signup/></> } />
            <Route path="/login" element={ <><Navbar/><Login/></> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
