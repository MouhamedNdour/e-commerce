import { Address } from "./user";

export interface OrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: Address
}


export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: Address;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
  }
  
  export interface OrderItem {
    itemOrdered: ItemOrdered;
    price: number;
    quantity: number;
    id: number;
  }
  
  export interface ItemOrdered {
    productItemId: number;
    productName: string;
    pictureUrl: string;
  }
  
  export interface ShipToAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }