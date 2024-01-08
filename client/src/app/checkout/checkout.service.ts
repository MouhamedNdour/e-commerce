import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl+'/order/deliveryMethods').pipe(
      map(dm => {
        return dm.sort((a, b) => b.price - a.price)
      })
    );
  }

  createOrder(order: IOrderToCreate) {
     return this.http.post<IOrder>(this.baseUrl + '/order', order);
  }
}
