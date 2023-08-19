import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import {
  ApplePay,
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";
import { Client } from "square";
import { randomUUID } from "crypto";
import CartItem from "@/components/CartItem";


export default function Checkout({ onClose, handlePayment }) {
  const [paymentError, setPaymentError] = useState(null);

  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId="sandbox-sq0idb-tk2yTly1BW5jpf4gTMjgRA"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          try {
            const response = await fetch("/api/pay", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
              }),
            });

            if (response.ok) {
              // Payment successful, call handlePayment
              await handlePayment();
              onClose(); // Close the Checkout component
            } else {
              const errorData = await response.json();
              setPaymentError(errorData.error);
            }
          } catch (error) {
            setPaymentError("An error occurred while processing payment.");
          }
        }}
        createPaymentRequest={() => ({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: subTotal.toFixed(2), // Calculate the total amount here
            label: "Total",
          },
        })}
        locationId="LAQ5KDFAPQ6J3"
      >
        <ApplePay />
        <GooglePay />
        <CreditCard
          buttonProps={{
            css: {
              backgroundColor: "#771520",
              fontSize: "14px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#530f16",
              },
            },
          }}
        />
      </PaymentForm>
      {paymentError && <p className={styles.error}>{paymentError}</p>}
    </div>
  );
}
