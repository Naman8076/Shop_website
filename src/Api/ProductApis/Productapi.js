import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// add category api
export const AddCategoryApi=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/addcategory`,data,header,"admin");
}
// geet category
export const GetCategoryApi=async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getcategory`,"",header,"admin");
}
// AddProductsApi
export const AddProductsApi = async(data,categoryId,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/addProducts?categoryid=${categoryId}`,data,header,"admin");
}
// get products api
export const GetProductsApi=async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getProducts?categoryid=${data.selectedcategory}&page=${data.page}`,"",header,"admin");
}
// GetLatestProductsApi
export const GetLatestProductsApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getLatestProducts`,"",header,"user");
}
// delete product
export const DeleteProductApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/product/api/products/${data.productid}`,{},header,"admin");
}
// GetSingleProductApi
export const GetSingleProductApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getsingleProduct/${data.productid}`,{},header,"user");
}
// AddReviewApi
export const AddReviewApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/productreview/${data.productid}`,data.data,header,"user");
}
// ProductReviewgetApi
export const ProductReviewgetApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getProductreview/${data.productid}`,"",header,"user");
}
// ProductReviewDeleteApi
export const ProductReviewDeleteApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/product/api/productreviewdelete/${data.reviewid}`,{},header,"user");
}
