import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AddCategoryApi, AddProductsApi, AddReviewApi, DeleteProductApi, GetCategoryApi, GetLatestProductsApi, GetProductsApi, GetSingleProductApi, ProductReviewDeleteApi, ProductReviewgetApi } from "../../../Api/ProductApis/Productapi";


export const AdminAddCategory=createAsyncThunk("AdminAddCategory",async(data)=>{
    try {
       const response=await AddCategoryApi(data);
       console.log("response",response);
       if(response.status===200)
       {
        toast.success("Category Successfully Added");
       
        return response.data;
       } else{
        toast.error(response.response.data.error);
       }
    } catch (error) {
        throw error
    }
});
// get category slice
export const getCategory=createAsyncThunk("getCategory",async(thunkApi)=>{
    try {
       const response=await GetCategoryApi();
    //    console.log("response",response);
       if(response.status===200)
       {
        return response.data;
       } else{
       return thunkApi.rejectWithValue("error")
       }
    } catch (error) {
        throw error
    }
});

// add products slice
export const AddProductsslice = createAsyncThunk("AddProducts",async(data)=>{
    try {
        const response = await AddProductsApi(data.data,data.categoryId,data.config);

        if(response.status == 200){
            toast.success("Product Added")
            return response.data
        }else{
            toast.error(response.response.data.error);
           
        }
    } catch (error) {
        throw error;
    }
});
// get products slice
export const getAllProducts = createAsyncThunk("getAllProducts",async(data)=>{
    try {
        const response = await GetProductsApi(data);
        

        if(response.status == 200){
            return response.data
        }else{
            toast.error(response.response.data.error);
           
        }
    } catch (error) {
        throw error;
    }
});
// get products slice
export const getLatestProducts = createAsyncThunk("getLatestProducts",async(thunkApi)=>{
    try {
        const response = await GetLatestProductsApi();
        

        if(response.status == 200){
            return response.data
        }else{
            
            return thunkApi.rejectWithValue("error")
           
        }
    } catch (error) {
        throw error;
    }
});
// delete product
export const deleteProduct = createAsyncThunk("deleteProduct",async(data)=>{
    try {
        const response = await DeleteProductApi(data);
        

        if(response.status == 200){
            toast.success("Product Delete Sucessfully");
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});
// getSingleProducts
export const getSingleProducts = createAsyncThunk("getSingleProducts",async(data)=>{
    try {
        const response = await GetSingleProductApi(data);
        

        if(response.status == 200){
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});
// Addreview
export const Addreview = createAsyncThunk("Addreview",async(data)=>{
    try {
        const response = await AddReviewApi(data);
        

        if(response.status == 200){
            toast.success("review sucessfully added")
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});
// Addreview
export const productreview = createAsyncThunk("productreview",async(data)=>{
    try {
        const response = await ProductReviewgetApi(data);
        

        if(response.status == 200){
            
            return response.data
        }else{
            console.log("error")
           
        }
    } catch (error) {
        throw error;
    }
});
// AddrreviewDeleteeview
export const reviewDelete = createAsyncThunk("reviewDelete",async(data)=>{
    try {
        const response = await ProductReviewDeleteApi(data);
        

        if(response.status == 200){
            toast.success("review sucessfully delete")
            return response.data
        }else{
            console.log("error")
           
        }
    } catch (error) {
        throw error;
    }
});
// crete reducer and action 
export const ProductSlice=createSlice({
    name:"ProductSlice",
    initialState:{
      addCategoryData:[],
      CategoryData:[],
      AddProducts:[],
      ProductsData:[],
      DeleteProducts:[],
      LatestProducts:[],
      singleProducts:[],
      addProductReview:[],
      deleteReview:[],
      ProductReview:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // admin add caegory
        builder.addCase(AdminAddCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminAddCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.addCategoryData=action.payload;
        })
        .addCase(AdminAddCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // get category
        .addCase(getCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.CategoryData=action.payload;
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        //  AddProductsslice
        .addCase(AddProductsslice.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AddProductsslice.fulfilled,(state,action)=>{
            state.loading = false;
            state.AddProducts = action.payload;
        })
        .addCase(AddProductsslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get allproducts slice
        .addCase(getAllProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductsData = action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete product
        .addCase(deleteProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.DeleteProducts = [action.payload];
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // getLatestProducts
        .addCase(getLatestProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getLatestProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.LatestProducts = action.payload;
        })
        .addCase(getLatestProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // getSingleProducts
        .addCase(getSingleProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getSingleProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.singleProducts = [action.payload];
        })
        .addCase(getSingleProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // getSingleProducts
        .addCase(Addreview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Addreview.fulfilled,(state,action)=>{
            state.loading = false;
            state.addProductReview = [action.payload];
        })
        .addCase(Addreview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //productreview
        .addCase(productreview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(productreview.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductReview = action.payload;
        })
        .addCase(productreview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //reviewDelete
        .addCase(reviewDelete.pending,(state)=>{
            state.loading = true;
        })
        .addCase(reviewDelete.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteReview =[ action.payload];
        })
        .addCase(reviewDelete.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ProductSlice.reducer;