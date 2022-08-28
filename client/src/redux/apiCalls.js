import { publicRequest } from "../requestMethods";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./UserRedux";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());

    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailed())
    }
}

export const register = async (dispatch, user)=>{
    dispatch(registerStart()); 
    console.log("register ,", user)
    try{
        const res = await publicRequest.post("auth/register", user)
        dispatch(registerSuccess(res.data))
    }catch(err){
        dispatch(registerFailed())
    }
}