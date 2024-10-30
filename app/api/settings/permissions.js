import { handleResponse, getHeaders, postHeaders } from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRegions = async () => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(API_BASE_URL + "/api/RegionOffices", params);
  return handleResponse(response);
};

export const fetchSingleRegion = async (id) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/RegionOffices/" + id,
    params
  );
  return handleResponse(response);
};

export const postRegion = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(API_BASE_URL + "/api/RegionOffices", params);
  return handleResponse(response);
};
