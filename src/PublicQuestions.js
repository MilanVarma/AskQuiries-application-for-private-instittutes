import React,{useState,useEffect} from 'react'
import "./CSS/Home.css";
import { useHistory } from 'react-router-dom';
import HomePublicQuestions from './HomePublicQuestions';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Home() {
    const history = useHistory();
    const [ques,setQues] = useState([]);
    

    const fetchQuestions = () =>{
      fetch('https://askquiries-backend.herokuapp.com/questions',{
        method:"GET",
        headers:{
          "x-auth-token":localStorage.getItem("token")
        }
      })
      .then((data) => {
        if(data.status == 200){
          return data.json()
        }

        throw new Error("Unauthorized")
      })
      .then((data) => setQues(data))
      .catch((err) => history.push("/login"))
      
    }

    useEffect(() =>{
      fetchQuestions()
    },[])
    
  return (
    <div className='HomePage'>
       <Navbar />
        <div className='HomePageSystem'>
               

                <div className='PublicQuestions'>
                    <h2>Public Questions</h2>
                   {ques.map((q) => (
                     <HomePublicQuestions data={q} key={q._id} />
                   ))}

                  
                </div>
        </div>
        <Footer />

    </div>
  )
}