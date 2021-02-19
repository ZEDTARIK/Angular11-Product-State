import { Component, OnInit } from '@angular/core';
import { AppDataState, DataStateEnum } from './../../State/product.state';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map(data => (
          {
            dataState: DataStateEnum.LOADING,
            data: data
          })),
        startWith({
          dataState: DataStateEnum.LOADED
        }),
        catchError(err =>
          of({
            dataState: DataStateEnum.ERROR,
            error: err
          })
        )
      );
  }


}
