import React,{useState,useEffect} from 'react'
import Comments from './Comments'
import "./CSS/ViewQuestion.css"

export default function ViewQuestionStyle({data,getData}) {
    const likelength = JSON.stringify(data.upvote?.length) || 0;
    const dislikelength = JSON.stringify(data.downvote?.length) || 0;
    const commentLength = JSON.stringify(data.comments?.length) || 0;

    const [comments,setComments] = useState(data.comments);
    const [comment,setCom] = useState("");
    const username = localStorage.getItem("username");

    const postComment = (data,id) =>{
        fetch(`https://askquiries-backend.herokuapp.com/comment/${id}`,{
          method:"PUT",
          body:JSON.stringify(data),
          headers:{
            'Content-type':'application/json',
            "x-auth-token":localStorage.getItem("token")
          }
        })
        .then((data) => {
          if(data.status == 200){
            return data.json();
          }

          throw new Error("Unauthorized")
        })
        .then((data) => setComments(data.comments))
        .catch((err) => console.log(err))
    }

    const handleClick = (id) =>{
      let usercomment = `${username} ${comment}`;
      let finalcomment = {com:usercomment};
      
      postComment(finalcomment,id);
      setCom("")
      usercomment = "";


    }

  const updateLike = (id) =>{
    fetch(`http://localhost:8000/like/${id}`,{
      method:"PUT",
      headers:{
        'Content-type':'application/json',
        "x-auth-token":localStorage.getItem("token")
      }
    })
    .then((data) => data.json())
    .then(() => getData())
    .catch((err) => console.log(err))
  }

  const updatedisLike = (id) =>{
    fetch(`http://localhost:8000/dislike/${id}`,{
      method:"PUT",
      headers:{
        'Content-type':'application/json',
        "x-auth-token":localStorage.getItem("token")
      }
    })
    .then((data) => data.json())
    .then((data) => console.log(data))
    .then(() => getData())
    .catch((err) => console.log(err))
  }
  return (
    <div>
        <div className='constraints'>
            <p>@{data.username}</p>
            <p>{data.createdAt}</p>
        </div>

      <div className='UserQuestion'>
        <p>{data.question}</p>
        <a>{data.description}</a>

      </div>

      <div className='likes'>
        <p onClick={() => updateLike(data._id)}>Like {likelength}</p>
        <p onClick={() => updatedisLike(data._id)}>DisLike {dislikelength}</p>
      </div>

      <div className='comments'>
        <h4>Comments</h4>
        
        <input 
        placeholder='Help this User...' 
        value={comment} 
        onChange={(e) => setCom(e.target.value)}/>
        <br />
        <button onClick={() => handleClick(data._id)}>Comment</button>
      </div>

      <div className='CommentsDisclamer'>
        {
        commentLength > 0 
        ? 
        comments.map((c,i) =>(
          <Comments data={c} key={i} />
        ))
        :
        <h5>No Comments yet :( <br />
        Be the first to comment on this post
       </h5>
        }
      </div>
      
    </div>
    
  )
}
