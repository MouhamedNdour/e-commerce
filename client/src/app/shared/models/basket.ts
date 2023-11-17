import * as cuid from "cuid";
import { BasketItem } from "./BasketItem";

export interface Basket {
    id: string;
    items: BasketItem[];
  }
  

  export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
  }