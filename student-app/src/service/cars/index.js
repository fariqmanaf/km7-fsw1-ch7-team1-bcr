export const getCars = async () => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars`;

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

export const getDetailCar = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    // get data
    const result = await response.json();
    return result;
}

export const updateCar = async (id, car) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: car,
    });

    const result = await response.json();
    return result;
}

export const createCar = async (car) => {  
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: car,
    });

    const result = await response.json();
    return result;
}

export const deleteCar = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "DELETE",
    });

    const result = await response.json();
    return result;
}