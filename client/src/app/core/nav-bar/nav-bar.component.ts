import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketItem } from 'src/app/shared/models/BasketItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  
  constructor(public basketService: BasketService) {}

  getCount(items: BasketItem[]){
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
