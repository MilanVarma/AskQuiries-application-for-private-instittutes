import React,{useState,useEffect} from 'react'
import "./CSS/ViewQuestion.css"

export default function Comments({data}) {
  const comment = data.split(' ');
  console.log(comment)
  const user = comment[0];
  const detail = comment.slice(1,comment.length+1);
  console.log(detail)
  return (
    <div className='commentsStyle'>
        <p><strong>{user}</strong> {detail.join(" ")}</p>
    </div>
  )
}
