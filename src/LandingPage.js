import React from 'react'
import "./CSS/LandingPage.css";
import { useHistory } from 'react-router-dom';

export default function LandingPage() {
  const history = useHistory();
  return (
    <div className='LandingPageBackground'>
        <div className='LandingPageContent'>
            <h1>Have a Doubt?</h1>
            <p>Are you too dumb to solve your coding errors? 
                This is the right place for you</p>
            <button 
            className='LoginButton' 
            onClick={() => history.push("/login")}>Login</button>
            <button className='SignupButton'>Signup</button>
        </div>
    </div>
  )
}
