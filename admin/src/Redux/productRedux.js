import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        //get All
        getProductStart:(state)=>{
            state.isFetching=true;
        },
        getProductSuccess:(state, action)=>{
            state.isFetching = false
            state.products = action.payload
        },
        getProductFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        //delete 
        deleteProductStart:(state)=>{
            state.isFetching=true;
        },
        deleteProductSuccess:(state, action)=>{
            state.isFetching = false
            state.products.splice(
                state.products.findIndex((item)=>item._id === action.payload),
                1
            )
        },
        deleteProductFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        //update 
        updateProductStart:(state)=>{
            state.isFetching=true;
        },
        updateProductSuccess:(state, action)=>{
            state.isFetching = false
            state.products[
                state.products.findIndex((item)=>item._id === action.payload.id)
            ] = action.payload.product
        },
        updateProductFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        //add 
        addProductStart:(state)=>{
            state.isFetching=true;
        },
        addProductSuccess:(state, action)=>{
            state.isFetching = false
            state.products.push(action.payload)
        },
        addProductFailed:(state)=>{
            state.isFetching = false;
            state.error = true
        },
    }
})

export const {getProductFailed, addProductFailed,addProductStart,addProductSuccess,getProductStart, getProductSuccess, deleteProductFailed, deleteProductStart,deleteProductSuccess, updateProductFailed,updateProductStart,updateProductSuccess} =productSlice.actions;
export default productSlice.reducer;