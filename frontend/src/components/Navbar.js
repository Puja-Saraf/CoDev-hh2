/* eslint-disable */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import maleUser from '../img/profuser.svg'

export default function Navbar({user,solid}) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const opac=!solid?'bg-[#FFD9C0] bg-opacity-5':'bg-white'

  const [cookies, setCookie,removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const handleLogout=(e)=>{
    removeCookie('AuthToken');
    removeCookie('UserId');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className='fixed w-full top-0 z-10'>

      <nav className={`relative flex flex-wrap items-center justify-between px-2 py-1 ${opac} shadow-lg md:shadow-md mb-3`}>
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-2xl font-bold leading-relaxed mr-4 py-2 whitespace-nowrap text-[#fd2f6e] flex flex-row"
              to="/"
            ><img src={logo} className='h-6 mt-2 mr-1' alt='logo'/>Co<span className='text-[#fe5740]'>Dev</span>
            </Link>
            <button
              className=" cursor-pointer leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={()=>setNavbarOpen(!navbarOpen)}
            >
                <div className="line h-0.5 w-6 my-1 bg-[#2f2e41]"></div>
                <div className="line h-0.5 w-6 my-1 bg-[#2f2e41]"></div>
                <div className="line h-0.5 w-6 my-1 bg-[#2f2e41]"></div>
            </button>
          </div>
          <div
            className={"lg:flex flex-grow items-center" +(navbarOpen ? " flex" : " hidden")}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center lg:items-center">
              {!user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>}
              {!user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/login"
                >Login
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/dashboard"
                ><i className="fa-solid fa-users text-2xl hidden lg:block text-[#fd2f6e]"></i>
                <span className='text-left block lg:hidden'>Dashboard</span>
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/chat"
                ><i className="fa-solid fa-comment text-2xl hidden lg:block text-[#fd2f6e]"></i>
                <span className='text-left block lg:hidden'>Chat</span>
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/rejectedusers"
                ><i className="fa-solid fa-user-xmark text-2xl hidden lg:block text-[#fd2f6e]"></i>
                <span className='text-left block lg:hidden'>Rejected Users</span>
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/pendingusers"
                ><i className="fa-solid fa-user-clock text-2xl hidden lg:block lg:mr-4 text-[#fd2f6e]"></i>
                <span className='text-left block lg:hidden'>Pending Users</span>
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/profile"
                ><img src={user.img_url?user.img_url:maleUser} className='w-11 h-11 rounded-full hidden lg:block'/>
                  <span className='text-left block lg:hidden'>My Profile</span>
                </Link>
              </li>}
              {user && <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#2f2e41] hover:opacity-75"
                  to="/"
                  onClick={handleLogout}
                ><i className="fa-solid fa-right-from-bracket text-2xl hidden lg:block "></i>
                <span className='text-left block lg:hidden'>Logout</span>
                </Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}
