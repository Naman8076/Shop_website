import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";


// ProcessPaymentApi
export const ProcessPaymentApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/checkout/api/payment`,data,header,"user");
}