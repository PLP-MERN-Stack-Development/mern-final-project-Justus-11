// Backend/config/paypalClient.js

import checkout from "@paypal/checkout-server-sdk";

// Create PayPal environment
const environment = new checkout.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

// Create PayPal client
const paypalClient = new checkout.core.PayPalHttpClient(environment);

// Export properly
export default paypalClient;

export const OrdersCreateRequest = checkout.orders.OrdersCreateRequest;
export const OrdersCaptureRequest = checkout.orders.OrdersCaptureRequest;
