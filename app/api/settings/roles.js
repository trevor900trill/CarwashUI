import {
  handleResponse,
  getHeaders,
  postHeaders,
  deleteHeaders,
} from "../utils/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllRoles = async () => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Permissions/GetAllRoles",
    params
  );
  return handleResponse(response);
};

export const fetchSingleRole = async (id) => {
  const params = {
    headers: await getHeaders(),
    method: "GET",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Permissions/GetRole/" + id,
    params
  );
  return handleResponse(response);
};

export const postRole = async (body) => {
  const params = {
    headers: await postHeaders(),
    method: "POST",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Permissions/CreateRole?roleName=" + body.roleName,
    params
  );
  return handleResponse(response);
};

export const updateRole = async (body, id) => {
  const params = {
    headers: await postHeaders(),
    method: "PUT",
    body: JSON.stringify({ ...body }),
  };
  const response = await fetch(
    API_BASE_URL + "/api/Permissions/UpdateRole/" + id,
    params
  );
  return handleResponse(response);
};

export const deleteRole = async (id) => {
  const params = {
    headers: await deleteHeaders(),
    method: "DELETE",
  };
  const response = await fetch(
    API_BASE_URL + "/api/Permissions/DeleteRole/" + id,
    params
  );
  return handleResponse(response);
};
