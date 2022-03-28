import React,{useState,useEffect} from 'react'
import { useHistory,useParams } from 'react-router-dom'
import Footer from './Footer'
import "./CSS/ViewQuestion.css"
import ViewQuestionStyle from './ViewQuestionStyle';
import Navbar from './Navbar';

export default function ViewQuestion() {
    const history = useHistory();
    const {id} = useParams();
    const [data,setData] = useState([]);
    const [comments,getComments] = useState([]);

    const fetchQuestion = () =>{
        fetch(`https://askquiries-backend.herokuapp.com/questions/${id}`,{
            method:"GET",
            headers:{
              "x-auth-token":localStorage.getItem("token")
            }

        })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => history.push("/login"))
    }

    useEffect(() =>{
        fetchQuestion()
    },[])

    
   
  return (
    <div>
      <Navbar />
      <div className='viewquestion'>
          <ViewQuestionStyle key={data._id} data={data} getData={fetchQuestion} />
          <Footer />
    </div>
    </div>
    
  )
}
