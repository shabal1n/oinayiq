import { Listings, Reservations, Users } from "@prisma/client";

export type SafeListings = Omit<Listings, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservations,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type SafeUser = Omit<
  Users,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface OrderData {
  id: string;
  shop_id: string;
  status: string;
  created_at: string;
  amount: number;
  display_amount: number;
  currency: string;
  mcc: string;
  capture_method: string;
  external_id: string;
  description: string;
  extra_info: string;
  attempts: number;
  due_date: string;
  split: boolean;
  customer_id: string;
  card_id: string;
  back_url: string;
  success_url: string;
  failure_url: string;
  template: string;
  access_token: string;
  checkout_url: string;
  payment_link_utl: string;
  payments: string[];
}

export interface Order {
  order: OrderData;
}

export interface PaymentWebhook {
  event: string;
  order: {
    id: string;
    shop_id: string;
    status: string;
    created_at: string;
    amount: number;
    currency: "KZT";
    capture_method: "AUTO";
    external_id: string;
    description: string;
    extra_info: {};
    due_date: string;
    subscription_id: string;
  };
  payment: {
    id: string;
    order_id: string;
    status: string;
    created_at: Date;
    approved_amount: number;
    captured_amount: number;
    refunded_amount: number;
    processing_fee: number;
    payer: {
      type: string;
      pan_masked: string;
      expiry_date: string;
      holder: string;
      payment_system: string;
      emitter: string;
      email: string;
      phone: string;
      customer_id: string;
      card_id: string;
    };
    error: {
      code: string;
      message: string;
    };
    acquirer: {
      name: string;
      reference: string;
    };
    action: {
      url: string;
    };
  };
  refund: {
    id: string;
    payment_id: string;
    order_id: string;
    status: string;
    created_at: Date;
    error: {
      code: string;
      message: string;
    };
    acquirer: {
      name: string;
      reference: string;
    };
  };
  installment: {
    id: string;
    order_id: string;
    redirect_url: string;
    status: string;
    created_at: Date;
    processing_fee: number;
    monthly_payment: null;
    interest_rate: null;
    effective_rate: null;
    iin: null;
    phone: null;
    period: null;
    contract_number: null;
    contract_signed_at: null;
    error: {
      code: string;
      message: string;
    };
  };
  customer: {
    id: string;
    shop_id: string;
    created_at: string;
    status: string;
    external_id: string;
    email: string;
    phone: string;
  };
  card: {
    id: string;
    customer_id: string;
    status: string;
    created_at: string;
    pan_masked: string;
    expiry_date: string;
    holder: string;
    payment_system: string;
    emitter: string;
    cvc_required: true;
    error: {
      code: string;
      message: string;
    };
    action: {
      url: string;
    };
  };
}

export type Currency = {
  value: string;
  label: string;
  icon: string;
};

export type Language = {
  value: string;
  label: string;
  icon: string;
};
