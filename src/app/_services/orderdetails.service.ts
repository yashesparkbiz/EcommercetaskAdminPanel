import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orderdetail } from '../_models/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  private headers!: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getbyorderid(id:number): Observable<Array<Orderdetail>>{
    return this.http.get<Array<Orderdetail>>("https://localhost:7180/OrderDetails/get-orderdetails-byorderid/"+id,{headers:this.headers});
  }

  delete(id:number){
    return this.http.delete("https://localhost:7180/OrderDetails/delete-orderdetailsbyid/"+id, {headers:this.headers});
  }
}
