import { format } from "date-fns";

const axios = require("axios");

interface IParams {
  amount: number;
  description?: string;
  back_url?: string;
  success_url?: string;
  failure_url?: string;
}

export default async function createOrder<Object>(params: IParams) {
  const { amount, description, back_url, success_url, failure_url } = params;
  const orderData = {
    currency: "KZT",
    capture_method: "AUTO",
    due_date: format(
      new Date(Date.now() + 15 * 60 * 1000),
      "yyyy-MM-dd HH:mm:ss"
    ),
    amount: amount * 100,
    description: description,
    back_url: back_url,
    success_url: success_url,
    failure_url: failure_url,
  };

  const API_KEY = process.env.NEXT_PUBLIC_PAYMENTS_API_KEY;

  const response = await axios.post(
    "https://stage-api.ioka.kz/v2/orders",
    orderData,
    {
      headers: {
        "API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data as Object;
}
