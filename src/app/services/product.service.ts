import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host = environment.host;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    
    return this.http.get<Product[]>(this.host+ '/Products'); 
  }

  getSelectedProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+'/Products?selected=true');
  }

  getAvailableProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+'/Products?available=true');
  }

  SearchProduct(keyword): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+`/Products?name_like=${keyword}`);
  }
}
