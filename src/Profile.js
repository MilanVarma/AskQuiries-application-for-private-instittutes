import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import Navbar from './Navbar';

import "./CSS/Profile.css"
import Footer from './Footer';
import blankImg from './Images/blank.webp';


export default function Profile() {
    const id = localStorage.getItem("Id");
    const history = useHistory();
    const [data,setData] = useState([]);
    const dp = localStorage.getItem("dp")

    const getUser = (id) =>{
        fetch(`https://askquiries-backend.herokuapp.com/getusers/${id}`,{
            method:"GET",
            headers:{
              "x-auth-token":localStorage.getItem("token")
            }
        })
        .then((data) =>{
          if(data.status == 200){
            return data.json()
          }
          throw new Error("Unauthorized")
        })
        .then((data) => setData(data))
        .catch((err) => {
          console.log(err)
          history.push("/login")
        })
        
    }

    useEffect(() =>{
      getUser(id)
    },[])

  return (
    <div>
    <Navbar />
  <div className='profile'>
    <h2>Your Profile</h2>
    <div className='Profilepicturesection'>
    <div className='profilepicture'>
    {dp != "undefined" ? <img src={`http://localhost:8000/uploads/${dp}`} /> : <img src={blankImg} />}
    </div>
    <a className='username'>@{data.username}</a>
    </div>
   
   
    <p>Firstname: {data.firstname}</p>
    <p>Lastname: {data.lastname}</p>
    <p>Email: {data.email}</p>
    
    
    </div>
    <Footer />
  </div>
   
  )
}
