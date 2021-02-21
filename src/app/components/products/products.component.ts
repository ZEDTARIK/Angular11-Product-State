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

  // Create Varialbe type Product DataState
  products$: Observable<AppDataState<Product[]>> | null = null;
  
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.onGetAllProducts();
  }

  // Get ALL Data From Server 
  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map(data => (
          {
            dataState: DataStateEnum.LOADED,
            data: data
          })),
        startWith({
          dataState: DataStateEnum.LOADING
        }),
        catchError(err =>
          of({
            dataState: DataStateEnum.ERROR,
            error: err
          })
        )
      );
  }

  // Get only Data Selected = true 
  onSelectedData() {
  this.products$ = this.productService.getSelectedProduct()
  .pipe(
    map(data => (
      {
        dataState: DataStateEnum.LOADED,
        data: data
      })),
    startWith({
      dataState: DataStateEnum.LOADING
    }),
    catchError(err =>
      of({
        dataState: DataStateEnum.ERROR,
        error: err
      })
    )
  );
  }

  // Get only Data with Available Filed = true 
  onAvailableData() {
    this.products$ = this.productService.getAvailableProduct()
    .pipe(
      map(data => (
        {
          dataState: DataStateEnum.LOADED,
          data: data
        })),
      startWith({
        dataState: DataStateEnum.LOADING
      }),
      catchError(err =>
        of({
          dataState: DataStateEnum.ERROR,
          error: err
        })
      )
    );
  }

  // Search Data from Searver
  onSearching(dataForm: any) {
    this.products$ = this.productService.SearchProduct(dataForm.keyword)
    .pipe(
      map(data => (
        {
          dataState: DataStateEnum.LOADED,
          data: data
        })),
      startWith({
        dataState: DataStateEnum.LOADING
      }),
      catchError(err =>
        of({
          dataState: DataStateEnum.ERROR,
          error: err
        })
      )
    );
  }

  onChangeSelected(product) {
    this.productService.ChangeSelectedProduct(product)
    .subscribe(res => {
        product.selected = res.selected
    });
  }


}
