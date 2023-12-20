import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import "../Styles/PayPalButtonComponent.css";

const PayPalButtonComponent = ({ amount, onSuccess, onCancel, onError }) => {
  return (
    <PayPalButton
      amount={amount}
      onSuccess={onSuccess}
      onCancel={onCancel}
      onError={onError}
    />
  );
};

export default PayPalButtonComponent;
