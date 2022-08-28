import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailed, addProductStart, addProductSuccess, deleteProductFailed, deleteProductStart, deleteProductSuccess, getProductFailed, getProductStart, getProductSuccess, updateProductFailed, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailed, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());

    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailed())
    }
}

export const getProducts = async (dispatch)=>{
    dispatch(getProductStart());

    try{
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data))
    }catch(err){
        dispatch(getProductFailed())
    }
}

export const deleteProduct = async (id, dispatch)=>{
    dispatch(deleteProductStart());

    try{
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailed())
    }
}

export const updateProduct = async (id, product, dispatch)=>{
    dispatch(updateProductStart()); 

    try{
        const res = await userRequest.put(`/products/${id}`, product)
        dispatch(updateProductSuccess({id, product:res.data}))
    }catch(err){
        dispatch(updateProductFailed())
    }
}

export const addProduct = async (product, dispatch)=>{
    dispatch(addProductStart()); 

    try{
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    }catch(err){
        dispatch(addProductFailed())
    }
}