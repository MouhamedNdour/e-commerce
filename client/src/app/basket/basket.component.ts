import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { AsyncPipe } from '@angular/common';
import { BasketItem } from '../shared/models/BasketItem';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  
  constructor(public basketService: BasketService) {
  }

  incrementQuantity(item: BasketItem): void {
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: {id: number, quantity: number}): void {
    this.basketService.removeItemFormBasket(event.id, event.quantity);
  }
}
