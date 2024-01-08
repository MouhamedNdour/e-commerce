import * as cuid from "cuid";
import { BasketItem } from "./BasketItem";

export interface Basket {
    id: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingprice: number;
  }
  

  export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
    shippingPrice = 0;
  }

  export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;

  }