export const getOptions = async (option) => {
  const token = localStorage.getItem("token");
  let params;
  if (option) {
    params.option = option;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/options` + new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailOption = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/options/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createOption = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("option", request.option);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/options`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const updateOption = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("option", request.option);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/options/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const deleteoption = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/options/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
};
