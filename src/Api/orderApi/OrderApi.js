
import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// AddOrderApi
export const AddOrderApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/order/api/addorders`,data,header,"user");
}
// userordersApi
export const userordersApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/order/api/getuserorders`,"",header,"user");
}
// GetOrdersApi
export const GetOrdersApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/order/api/orders`,"",header,"admin");
}
// OrdersUpdatestatusApi
export const OrdersUpdatestatusApi = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/order/api/orders/${data.orderid}`,data,header,"admin");
}