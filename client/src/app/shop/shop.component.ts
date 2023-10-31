import { Component, OnInit } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/Product';
import { ShopParams } from '../shared/models/shopParams';
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

  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
  this.getProduct();
  this.getBrands();
  this.getTypes();
}

  getProduct() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data,
        this.shopParams.pageNumber = response.pageIndex,
        this.shopParams.pageSize = response.pageSize,
        this.totalCount = response.count
      },
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
    this.shopParams.brandId= brandId;
    this.getProduct();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProduct();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProduct();
  }

  onPageChanged(event: any) {
    if(this.shopParams.pageNumber !== event.page) {
      this.shopParams.pageNumber = event.page;
      this.getProduct();
    }
  }
  
}