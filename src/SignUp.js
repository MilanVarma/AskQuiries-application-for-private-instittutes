import React,{useState,useEffect} from 'react'
import FileBase64 from 'react-file-base64';
import blankImg from './Images/blank.webp';
import {useHistory} from 'react-router-dom';
import "./CSS/SignUp.css";

export default function SignUp() {
    const history = useHistory();
    const [firstname,setFirst] = useState("");
    const [lastname,setLast] = useState("");
   
    const [email,setEmail] = useState("")
    const [username,setUser] = useState("");
    const [password,setPass] = useState("");
    const [profilephoto,setPro] = useState("");
    const [image,setImage] = useState("")
    const [Data,setData] = useState([])

    const signupuser = () =>{
        const formData = new FormData();
        formData.append("firstname",firstname)
        formData.append("lastname",lastname)
        formData.append("username",username)
        formData.append("password",password)
        formData.append("email",email)
        formData.append("profilephoto",profilephoto)
       

        fetch("https://askquiries-backend.herokuapp.com/signup",{
            method:"POST",
            body:formData,
            
        })
        .then(() => history.push("/login"))
    }
    
    const fetchData = () =>{
        let id = "62379ef5cb41a500d45fa597";
        fetch(`http://localhost:8000/getusers/${id}`,{
            method:"GET"
        })
        .then((data) => data.json())
        .then((data) => setData(data))
        .then((data) => console.log(Data) )
    }

    useEffect(fetchData,[])

    const profileImage = (e) =>{
       
        setPro(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
       

    }
    

    
  return (
    <div className='Signuppage'>
        <h1>SignUp </h1>
        <div className='profileSelection'>
            <div className='imageDesign'>
                {image === "" ? <img src={blankImg} /> : <img src={image} />}
            </div>
            
            <input type="file"  onChange={(e) => profileImage(e)}/>
        </div>

            <input 
            value={firstname} 
            onChange={(e) => setFirst(e.target.value)} 
            className="Signininput"
            placeholder='firstname'/>
            <input 
            value={lastname} 
            onChange={(e) => setLast(e.target.value)}
            className="Signininput"
            placeholder='lastname'/>
        
        <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="Signininput"
        placeholder='email'/>
       
        <input 
        value={username} 
        onChange={(e) => setUser(e.target.value)} 
        className="Signininput"
        placeholder='username'/>
        
        <input 
        value={password} 
        onChange={(e) => setPass(e.target.value)}
        className="Signininput"
        placeholder='password'/>
       

        <button onClick={() => signupuser()}>Submit</button>
        <p>Already have an account?<span onClick={() => history.push("/login")}> Login</span></p>

    </div>
    
  )
}
