import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  get():Observable<Array<Order>>{
    return this.http.get<Array<Order>>("https://localhost:7180/Orders/get-all-orders",{headers: this.headers});
  }

  delete(id:number){
    return this.http.delete("https://localhost:7180/Orders/delete-orderbyid/"+id,{headers:this.headers});
  }
}
