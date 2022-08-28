import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        logout:(state)=>{
            state.currentUser = {};
        },
        registerStart:(state)=>{
            state.isFetching=true;
        },
        registerSuccess:(state, action)=>{
            state.isFetching = false
            state.currentUser = action.payload
        },
        registerFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
    }
})

export const {loginStart, loginSuccess, loginFailed,logout, registerFailed,registerStart,registerSuccess} =userSlice.actions;
export default userSlice.reducer;