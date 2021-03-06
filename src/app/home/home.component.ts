import { FormControl } from '@angular/forms';
import { Product, ProductService } from './../product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Array<Product> = [];
  titleFilter: FormControl = new FormControl();
  filterCriteria: string;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProduct();
    this.titleFilter.valueChanges
        .debounceTime(100)
        .subscribe(
          value => this.filterCriteria = value,
          error => console.error(error)
        );
  }

}
