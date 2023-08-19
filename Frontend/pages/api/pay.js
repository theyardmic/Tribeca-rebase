import { Client } from "square";
import { randomUUID } from "crypto";


BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const createPaymentLink = async (cartItems) => {
  try {
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + STRAPI_API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
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
