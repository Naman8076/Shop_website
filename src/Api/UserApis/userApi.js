import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// userr register
export const registerApi = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/userauth/api/register`,
    data,
    header,
    "user"
  );
};
// loginApi
export const loginApi = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/userauth/api/login`,
    data,
    header,
    "user"
  );
};
// userveriyInApi
export const userLoggedInApi = async (data, header) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/userauth/api/userloggedin`,
    "",
    header,
    "user"
  );
};
// userLogoutApi
export const userLogoutApi = async (data, header) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/userauth/api/logout`,
    "",
    header,
    "user"
  );
};
// forgotpasswordApi
export const forgotpasswordApi = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/userauth/api/forgotpassword`,
    data,
    header,
    "user"
  );
};
// forgotpasswordApi
export const forgotpasswordverifyApi = async (data, header) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/userauth/api/forgotpassword/${data.id}/${data.token}`,
    "",
    header,
    "user"
  );
};
// resetpasswordApi
export const resetpasswordApi = async (data, header) => {
  return await commonrequest(
    "PUT",
    `${BASE_URL}/userauth/api/resetpassword/${data.id}/${data.token}`,
    data.passworddata,
    header,
    "user"
  );
};
// getAlluserApi
export const getAlluserApi = async (data, header) => {
  return await commonrequest(
    "GET",
    `${BASE_URL}/userauth/api/getAlluser/?page=${data.page}`,
    "",
    header,
    "admin"
  );
};
// DeleteuserApi
export const DeleteuserApi = async (data, header) => {
  return await commonrequest(
    "DELETE",
    `${BASE_URL}/userauth/api/userdelete/${data.userid}`,
    {},
    header,
    "admin"
  );
};
// usercontactApi
export const usercontactApi = async (data, header) => {
  return await commonrequest(
    "POST",
    `${BASE_URL}/userauth/api/usercontact`,
    data,
    header,
    "user"
  );
};
