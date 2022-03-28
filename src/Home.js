import React,{useState,useEffect} from 'react'
import "./CSS/Home.css";
import { useHistory } from 'react-router-dom';
import HomePublicQuestions from './HomePublicQuestions';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Home() {
    const history = useHistory();
    const [ques,setQues] = useState([]);
    const que = ques.slice(0,5);

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

        throw new Error("Unauthorized");
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
                <div className='AskSomethingDiv'>
                    <h1>Have doubts you wanna clarify?</h1>
                    <button onClick={() => history.push("/askquestion")}>Ask Something</button>
                </div>

                <div className='PublicQuestions'>
                    <h2>Public Questions</h2>
                   {que.map((q) => (
                     <HomePublicQuestions data={q} key={q._id} />
                   ))}

                   <button>View More...</button>
                </div>
        </div>
        <Footer />

    </div>
  )
}
