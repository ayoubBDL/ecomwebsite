import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/apiCalls";


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleClick = (e)=>{
    e.preventDefault()
    login(dispatch, {username, password})
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
