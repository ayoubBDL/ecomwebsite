import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/apiCalls";


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleClick = (e)=>{
    e.preventDefault()
    login(dispatch, {username, password})
    navigate("/")
  }
  return (
    <div
        style={{
            height:'100vh',
            display:'flex',
            alignItems:'center',
            justifyContent:"center",
            flexDirection:'column'
        }}
    >
        <input style={{marginBottom:20, padding:10}} placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
        <input style={{marginBottom:20, padding:10}} placeholder="password" type={"password"} onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleClick} >LOGIN</button>
        
    </div>
  );
};

export default Login;
