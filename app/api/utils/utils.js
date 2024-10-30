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

export const loginHeaders = (body) => {
  const credentials = btoa(`${body.email}:${body.password}`);
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${credentials}`,
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
