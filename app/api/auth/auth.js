import {
  handleResponse,
  handleLoginResponse,
  loginHeaders,
  postHeaders,
  getHeaders,
} from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const globalUserTypes = ["Individual", "Agent", "Corporate", "Rider"];
const globalOtpTypes = ["Login", "Signin", "CollectionRequest"];

export const logIn = async (body) => {
  const params = {
    headers: loginHeaders(body),
    method: "POST",
  };
  const response = await fetch(API_BASE_URL + "/api/Auth/login", params);
  return handleLoginResponse(response);
};

export const signUp = async (body, userType) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({
      userType: globalUserTypes[userType],
      agentCode: "string",
      ...body,
    }),
  };
  const response = await fetch(
    API_BASE_URL +
      "/api/Auth/register_user?userTypes=" +
      globalUserTypes[userType],
    params
  );
  return handleResponse(response);
};

export const fetchUsersByType = async (userType) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Auth/all_users?userType=" + globalUserTypes[userType],
    params
  );
  return handleResponse(response);
};

export const generateOTP = async (body, otpType) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/Otp/InitiateOtp?action=" + globalOtpTypes[otpType],
    params
  );
  return handleResponse(response);
};

export const validateOTP = async (body, otpType) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/Otp/VerifyOtp?action=" + globalOtpTypes[otpType],
    params
  );
  return handleResponse(response);
};
