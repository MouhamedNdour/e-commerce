import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { Product } from './shared/models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private basketService: BasketService, private accountService: AccountService) {
   }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket(){
    const basktId = localStorage.getItem('basket_id');
    if(basktId)
      this.basketService.getBasket(basktId);
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadcurrentUser(token).subscribe();
  }
}
 