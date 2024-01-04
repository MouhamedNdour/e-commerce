import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders?: IOrder[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrdersForUser().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }

}