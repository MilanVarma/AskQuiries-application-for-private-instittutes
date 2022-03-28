import React,{ useState, useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import HomePublicQuestions from './HomePublicQuestions';
import Footer from './Footer';
import Navbar from './Navbar';
import "./CSS/Home.css";

export default function YourQuestions() {
    const [data,setData] = useState([]);
    const Id = localStorage.getItem("Id");
    const history = useHistory();
    const getQues = (id) =>{
        fetch(`https://askquiries-backend.herokuapp.com/allques/${id}`,{
            method:"GET",
            headers:{
                "x-auth-token":localStorage.getItem("token")
            }
        })
        .then((data) => {
            if(data.status === 200){
                return data.json()
            }

            throw new Error("Unauthorized");
        })
        .then((data) => setData(data))
        .catch((err) => history.push("/login"))
    }

    useEffect(() =>{
        getQues(Id)
    },[])

  return (
    <div className='HomePage'>
        <Navbar />
        <div className='HomePageSystem'>
            <div className='PublicQuestions'>
                <h2>Your Questions</h2>
                {data.length > 0 ? data.map((q) => (
                     <HomePublicQuestions data={q} key={q._id} />
                   ))
                : 
                <div className='yourquestionsbanner'>
                     <p>You havent posted anything yet</p>
                </div>
               }
            </div>
        </div>
            
        <Footer />
    </div>
  )
}
