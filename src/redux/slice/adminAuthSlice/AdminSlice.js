import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoggedInApi, AdminLoginApi, AdminLogoutApi } from "../../../Api/AdminApi/Adminapi";
import toast from "react-hot-toast";
import { GetOrdersApi, OrdersUpdatestatusApi } from "../../../Api/orderApi/OrderApi";

// adminlogin slice
export const AdminAuthLogin=createAsyncThunk("AdminLogin",async(data)=>{
    try {
       const response=await AdminLoginApi(data);
       console.log("response",response);
       if(response.status===200)
       {
        toast.success("admin login suceesfully done");
        localStorage.setItem("admintoken",response.data.token)
        return response.data;
       } else{
        toast.error(response.response.data.error);
       }
    } catch (error) {
        throw error
    }
});
// admin loggedinslice
export const AdminLoggedIn = createAsyncThunk("AdminLoggedIn",async(thunkApi)=>{
    try {
        const response = await AdminLoggedInApi();
        // console.log("response",response);
        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
})
// admin logout slice
export const AdminLogout = createAsyncThunk("AdminLogout",async(thunkApi)=>{
    try {
        const response = await AdminLogoutApi();
        // console.log("response",response);
        if(response.status == 200){
            toast.success("Admin Logout Done")
            localStorage.removeItem("admintoken")
            return response.data
        }else{
            toast.success("Admin Logout Done")
            localStorage.removeItem("admintoken")
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
})
// admin Ordersforadmin slice
export const Ordersforadmin = createAsyncThunk("Ordersforadmin",async(thunkApi)=>{
    try {
        const response = await GetOrdersApi();
        // console.log("response",response);
        if(response.status == 200){
         
            return response.data
        }else{
            
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
})
// admin OrderUpdateStatus slice
export const OrderUpdateStatus = createAsyncThunk("OrderUpdateStatus",async(data)=>{
    try {
        const response = await OrdersUpdatestatusApi(data);
        // console.log("response",response);
        if(response.status == 200){
         toast.success("Order status Updated")
            return response.data
        }else{
            toast.error(response.response.data.error)
            
        }
    } catch (error) {
        throw error;
    }
})

// crete reducer and action 
export const AdminSlice=createSlice({
    name:"AdminSlice",
    initialState:{
        adminlogin:[],
        adminLoggedINData:[],
        adminLogoutData:[],
        OrdersData:[],
        OrdersStatusChange:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // admin login
        builder.addCase(AdminAuthLogin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminAuthLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminlogin=action.payload;
        })
        .addCase(AdminAuthLogin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // admin verify
        .addCase(AdminLoggedIn.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AdminLoggedIn.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminLoggedINData = [action.payload];
        })
        .addCase(AdminLoggedIn.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // admin Logout
        .addCase(AdminLogout.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AdminLogout.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminLogoutData = [action.payload];
        })
        .addCase(AdminLogout.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // Ordersforadmin
        .addCase(Ordersforadmin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Ordersforadmin.fulfilled,(state,action)=>{
            state.loading = false;
            state.OrdersData = action.payload;
        })
        .addCase(Ordersforadmin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // OrderUpdateStatus
        .addCase(OrderUpdateStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(OrderUpdateStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.OrdersStatusChange = [action.payload];
        })
        .addCase(OrderUpdateStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default AdminSlice.reducer;
