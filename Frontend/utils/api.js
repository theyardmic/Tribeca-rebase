import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromAPi = async (endpoint) => {
  const options = {
    method: 'GET',
    headers:{
    Authorization: 'Bearer ' + STRAPI_API_TOKEN
  },
};

const res = await fetch(`${API_URL}${endpoint}`, options);
const data = await res.json();
return data;

}


export const makePaymentRequest = async (endpoint, payload) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
          Authorization: "Bearer " + STRAPI_API_TOKEN,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};



export const createPaymentLink = async (cartItems) => {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + STRAPI_API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: cartItems }), // Send cart items to create order
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to create payment link.");
      return null;
    }
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

