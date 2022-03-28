import React,{useRef} from 'react'
import "./CSS/Navbar.css";
import {FaBars,FaTimes} from 'react-icons/fa';
import { Link,useHistory } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import blankImg from './Images/blank.webp';


export default function Navbar() {
  const navRef = useRef();
  const history = useHistory();
  const dp = localStorage.getItem("dp");

  const showNavBar = () =>{
    navRef.current.classList.toggle("responsive_nav");
  }

  const logout = () =>{
    localStorage.clear()
    history.push("/login")
   
  }
  return (
    <header>
       <button className='nav-btn'>
        <FaBars onClick={showNavBar}/>
      </button>
      <nav ref={navRef}>
        
      <Link to="/home"><a>Home</a></Link>
      <Link to="/publicquestion"><a>Public Questions</a></Link>
      <Link to="/askquestion"><a>Ask Something</a></Link>
      <Link to="/yourquestions"><a>Your Questions</a></Link>
      <Link to="/profile"><a>Profile</a></Link>
      <a onClick={logout}><LogoutIcon /></a>
        
        <button className='nav-btn nav-close-btn'>
          <FaTimes onClick={showNavBar} />
        </button>
      </nav>
      <div className='navbar_img'>
      {dp != "undefined" ? <img src={`http://localhost:8000/uploads/${dp}`} /> : <img src={blankImg} />}
      </div>
    
    </header>
  )
}
