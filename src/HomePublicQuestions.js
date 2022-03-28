import React from 'react'
import { useHistory } from 'react-router-dom';
import './CSS/Home.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function HomePublicQuestions({data}) {
  
  const history = useHistory();
  const Que = data.question.split(" ");
  const question = Que.length > 6 ? `${Que.slice(0,6).join(" ")}...` : Que.join(" ");
  return (
    <div className='HomePublicQuestions' onClick={() => history.push(`/ViewQuestion/${data._id}`)}>
      <div>
          <h4>{question}</h4>
          <p>@{data.username}</p>
      </div>

      <div>
        <h3><NavigateNextIcon /></h3>
      </div>
        

    </div>
  )
}
