import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { ProcessPaymentApi } from "../../../Api/PaymentApis/paymentapi";
import { AddOrderApi } from "../../../Api/orderApi/OrderApi";

// PaymentSlice slice
export const paymentProcess=createAsyncThunk("paymentProcess",async(data)=>{
    try {
       const response=await ProcessPaymentApi(data);
     
       if(response.status===200)
       {
        
        return response.data;
       } else{
        toast.error(response.response.data.error);
       }
    } catch (error) {
        throw error
    }
});
// Order slice
export const Order=createAsyncThunk("Order",async(data)=>{
    try {
       const response=await AddOrderApi(data);
       console.log("response",response);
       if(response.status==200)
       {
        toast.success("your payment succesfully completed ")
        return response.data;
       } else{
        toast.error(response.response.data.error);
       }
    } catch (error) {
        throw error
    }
});

export const PaymentSlice=createSlice({
    name:"PaymentSlice",
    initialState:{
        payment:[],
        ordersucess:[],
        
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // admin login
        builder.addCase(paymentProcess.pending,(state)=>{
            state.loading=true;
        })
        .addCase(paymentProcess.fulfilled,(state,action)=>{
            state.loading=false;
            state.payment=action.payload;
        })
        .addCase(paymentProcess.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // Order 
        builder.addCase(Order.pending,(state)=>{
            state.loading=true;
        })
        .addCase(Order.fulfilled,(state,action)=>{
            state.loading=false;
            state.ordersucess=action.payload;
        })
        .addCase(Order.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        
    
    }
})

export default PaymentSlice.reducer;