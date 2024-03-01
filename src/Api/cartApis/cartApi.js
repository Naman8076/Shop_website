import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";


// AddtoCartApi
export const AddtoCartApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/carts/api/addtocart/${data}`,{},header,"user");
}
// GetUserCartApi
export const GetUserCartApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/carts/api/getcarts`,"",header,"user");
}
// RemoveSingleCartItemsApi
export const RemoveSingleCartItemsApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removesingleitem/${data}`,{},header,"user");
}
// RemoveSingleCartItemsApi
export const RemoveAllCartItemsApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removeiteams/${data}`,{},header,"user");
}
// DeletecartDataApi
export const DeletecartDataApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removecartdata`,{},header,"user");
}
