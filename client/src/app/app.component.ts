import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Product } from './shared/models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private basketService: BasketService) {
   }

  ngOnInit(): void {
    const basktId = localStorage.getItem('basket_id');
    if(basktId)
      this.basketService.getBasket(basktId);
  }
}
 