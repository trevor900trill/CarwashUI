import {
  handleResponse,
  getHeaders,
  postHeaders,
  multiPartPostHeaders,
} from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCollections = async () => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Collections/GetCollections",
    params
  );
  return handleResponse(response);
};

export const fetchSingleCollection = async (id) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Collections/GetCollection/" + id,
    params
  );
  return handleResponse(response);
};

export const postCollection = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/Collections/AddCollection",
    params
  );
  return handleResponse(response);
};

export const postQuickCollection = async (body) => {
  const params = {
    headers: await multiPartPostHeaders(),
    method: "POST",
    body: body,
  };
  const response = await fetch(
    API_BASE_URL + "/api/Collections/QuickCollection",
    params
  );
  return handleResponse(response);
};

export const updateCollection = async (body, id) => {
  const params = {
    headers: await postHeaders(),
    method: "PUT",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/Collections/UpdateCollection/" + id,
    params
  );
  return handleResponse(response);
};
