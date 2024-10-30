import { handleResponse, getHeaders, postHeaders } from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCenterOffices = async () => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(API_BASE_URL + "/api/CenterOffices", params);
  return handleResponse(response);
};

export const fetchSingleCenterOffice = async (id) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/CenterOffices/" + id,
    params
  );
  return handleResponse(response);
};

export const postCenterOffice = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(API_BASE_URL + "/api/CenterOffices", params);
  return handleResponse(response);
};
