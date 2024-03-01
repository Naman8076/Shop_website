import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// admin register api 
    export const AdminregisterApi=async(data,header)=>{
        return await commonrequest("POST",`${BASE_URL}/adminauth/api/register`,data,header,"admin");
    }
export const AdminLoginApi=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/adminauth/api/login`,data,header,"admin");
}
// admin adminloggedin api
export const AdminLoggedInApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/adminauth/api/adminverify`,"",header,"admin");
}
// admin logout api
export const AdminLogoutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/adminauth/api/logout`,"",header,"admin");
}