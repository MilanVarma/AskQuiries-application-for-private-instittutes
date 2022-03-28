import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./CSS/AskQuestion.css";
import Footer from './Footer';
import Navbar from './Navbar';
export default function AskQuestion() {
  const history = useHistory();
  const [ques,setQues] = useState("");
  const [des,setDes] = useState('');

  const id = localStorage.getItem("Id");
  const username = localStorage.getItem("username")

  const postQuestion = (data) =>{
    fetch("https://askquiries-backend.herokuapp.com/questions",{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-type":"application/json",
        "x-auth-token":localStorage.getItem("token")
      }
    })
    .then((data) => {
      if(data.status == 200){
        return data.json()
      }

      throw new Error("Unauthorized")
    })
    .then(() => history.push("/publicquestion"))
    

  }

  const QuestionDetails = () =>{
    const details = {
      creatorId:id,
      question:ques,
      description:des,
      username:username
    }

    postQuestion(details)
  }

  return (
    <div >
      <Navbar />
        <div className='AskQuestionform'>
          <h2>Enter your Question</h2>
          <label >Question</label>
          <input type="text" id="que" value={ques} onChange={(e) => setQues(e.target.value)}/>
          <br />
          <label >Description (optional)</label>
          <textarea id="des" value={des} onChange={(e) => setDes(e.target.value)}></textarea>
          <button onClick={() => QuestionDetails() }>Ask Question</button>
        </div>
        <Footer />
    </div>
  )
}
