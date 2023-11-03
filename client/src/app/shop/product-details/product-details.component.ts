import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
 
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.shopService.getProduct(+id).subscribe({
        next: product => this.product = product,
        error: err => console.log(err)
      });
    } 
  }

}
