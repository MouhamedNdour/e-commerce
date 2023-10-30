import { Component, OnInit } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/Product';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];

  brandIdSelected = 0;
  typeIdSelected = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
  this.getProduct();
  this.getBrands();
  this.getTypes();
}

  getProduct() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error)
     });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
     });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: 'All'}, ...response],
      error: error => console.log(error)
     });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProduct();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProduct();
  }
  
}