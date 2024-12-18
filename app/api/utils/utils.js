import { jwtDecode } from "jwt-decode";

export const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Authorization Expired - Please log out then log back in again."
      );
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
  }
  return response;
};

export const handleLoginResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response;
};

export const loginHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export const deleteHeaders = async () => {
  if (!localStorage.getItem("userData")) {
    return {
      "Accept-Type": "application/json",
    };
  } else {
    const t = JSON.parse(localStorage.getItem("userData"));
    return {
      "Accept-Type": "application/json",
      Authorization: "Bearer " + t.result.token,
    };
  }
};

export const getHeaders = async () => {
  if (!localStorage.getItem("userData")) {
    return {
      "Accept-Type": "application/json",
    };
  } else {
    const t = JSON.parse(localStorage.getItem("userData"));
    return {
      "Accept-Type": "application/json",
      Authorization: "Bearer " + t.result.token,
    };
  }
};

export const postHeaders = async () => {
  if (!localStorage.getItem("userData")) {
    return {
      "Content-Type": "application/json",
    };
  } else {
    const t = JSON.parse(localStorage.getItem("userData"));
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + t.result.token,
    };
  }
};

export const multiPartPostHeaders = async () => {
  if (!localStorage.getItem("userData")) {
    return {};
  } else {
    const t = JSON.parse(localStorage.getItem("userData"));
    return {
      Authorization: "Bearer " + t.result.token,
    };
  }
};

export const postCreators = () => {
  const t = JSON.parse(localStorage.getItem("userData"));
  if (t == null) {
    return "system";
  } else {
    return "t.email";
  }
};

export const getCurrentTime = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toISOString();
};

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const decodeAndCheckPermission = () => {
  if (typeof window === "undefined") {
    return [];
  } else {
    const t = JSON.parse(localStorage.getItem("userData"));
    /*
    const token = t.result.token;
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.permissions !== undefined) {
        const permission = decodedToken.permissions;
        if (Array.isArray(permission)) {
          const permissions = permission.map((jsonString) => {
            try {
              return JSON.parse(jsonString);
            } catch (error) {
              console.error("Error parsing permission JSON:", error);
              return {};
            }
          });

          return permissions;
        } else {
          const permissions = JSON.parse(permission);

          return [permissions];
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    return [];
    */
    // const usertype = t.result.profile.userType;
    // if (usertype === "Individual" || usertype === "Agent") {
    //   return [
    //     { Permission: "Dashboard" },
    //     { Permission: "IndividualCollectionCenters" },
    //   ];
    // } else {
    return [
      { Permission: "Dashboard" },
      { Permission: "RegionalCenters" },
      { Permission: "CenterOffices" },
      { Permission: "Agents" },
      { Permission: "CollectionCenters" },
      { Permission: "Reports" },
      { Permission: "Users" },
      { Permission: "Categories" },
      { Permission: "Settings" },
    ];
    // }
  }
};
