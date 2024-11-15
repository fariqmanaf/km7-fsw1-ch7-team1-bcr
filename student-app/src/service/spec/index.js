export const getSpecs = async (spec) => {
  const token = localStorage.getItem("token");
  let params;
  if (spec) {
    params.spec = spec;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/specs` + new URLSearchParams(params);

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

export const getDetailSpec = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/specs/${id}`;

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

export const createSpec = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("spec", request.spec);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/specs`, {
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

export const updateSpec = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("spec", request.spec);
  
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/specs/${id}`,
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

export const deleteSpec = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/specs/${id}`;

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
