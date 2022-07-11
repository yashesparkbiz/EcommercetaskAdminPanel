import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }
  get() : Observable<Array<Product>>{
    debugger
    return this.http.get<Array<Product>>("https://localhost:7180/Product/get-all-product", { headers: this.headers });
  }

  getbyid(id:number):Observable<Product>{
    return this.http.get<Product>("https://localhost:7180/Product/get-productbyid/"+id, {headers:this.headers});
  }

  updateProduct(body: Product){
    return this.http.put<any>("https://localhost:7180/Product/update-product", JSON.stringify(body), { headers: this.headers });
  }

  delete(id:number){
    return this.http.delete("https://localhost:7180/Product/delete-product/"+id, {headers : this.headers});
  }
}