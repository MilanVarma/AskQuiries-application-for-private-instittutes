import React,{useState,useEffect} from 'react'
import "./CSS/Login.css";
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [user,setUser] = useState('');
  const [pass,setPass] = useState('');

  const history = useHistory();
  

  const Login = (data) =>{
    fetch('https://askquiries-backend.herokuapp.com/login',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-type":"application/json"
      }
     
    })
    .then((data) => data.json())
    .then((data) => {
      localStorage.setItem("token",data.token)
      localStorage.setItem("Id",data.id)
      localStorage.setItem("firstname",data.firstname)
      localStorage.setItem("lastname",data.lastname)
      localStorage.setItem("username",data.username)
      localStorage.setItem("dp",data.dp)

      
      history.push("/home")
    })
  }


  const LoginData = () =>{
    const Data = {
      username:user,
      password:pass
    }

    Login(Data)
  }

  
  return (
    <div className='LoginSystem'>
        <h1>Login</h1>
        <input type="text" 
        placeholder="Username" 
        value={user}
        onChange={(e) => setUser(e.target.value)}/>

        <input type="password" 
        placeholder='Password' 
        value={pass}
        onChange={(e) => setPass(e.target.value)}/>

        <button onClick={() => LoginData()}>Login</button>
        <p>Dont have an account?<span onClick={() => history.push("/signup")}> SignUp</span></p>
    </div>
  )
}
