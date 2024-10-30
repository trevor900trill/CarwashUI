import { handleResponse, getHeaders, postHeaders } from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCategories = async () => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(API_BASE_URL + "/api/Category", params);
  return handleResponse(response);
};

export const fetchSingleCategory = async (id) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(API_BASE_URL + "/api/Category/" + id, params);
  return handleResponse(response);
};

export const postCategory = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(API_BASE_URL + "/api/Category", params);
  return handleResponse(response);
};

export const postSubCategory = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(API_BASE_URL + "/api/CategorySub", params);
  return handleResponse(response);
};

export const updateSubCategory = async (body, id) => {
  const params = {
    headers: await postHeaders(),
    method: "PUT",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/CategorySub?subCategoryId=" + id,
    params
  );
  return handleResponse(response);
};
