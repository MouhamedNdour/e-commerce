import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../shared/models/basket';
import { BasketItem } from '../shared/models/BasketItem';
import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiURL;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  
  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + '/basket?id=' + id).subscribe(
      {
        next: basket => this.basketSource.next(basket)
      }
    );
  }
  
  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + '/basket', basket).subscribe(
      {
        next: basket => this.basketSource.next(basket)
      }
    );
  }
  
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1){
    const itemToAdd = this.mapProductToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  
  private createBasket(): Basket  {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);

    if(item) item.quantity += quantity;
    else{
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private mapProductToBasketItem(item: Product): BasketItem{
    return{
      id: item.id,
      productName: item.name,
      price : item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }
}
