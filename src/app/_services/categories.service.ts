import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../_models/categories.model';
import { Category } from '../_interfaces/category';
import { categoryUpdate } from '../_components/categories/categories.component';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
   }
   list?: Categories[];

   get() : Observable<Array<Categories>> {
    debugger
    return this.http.get<Array<Categories>>("https://localhost:7180/ProductCategory/get-all-productcategory", { headers: this.headers });
   }

   add(body: Category) {
    debugger
     return this.http.post<any>("https://localhost:7180/ProductCategory/add-productcategory", JSON.stringify(body), { headers: this.headers });
   }

   delete(id:number){
    return this.http.delete("https://localhost:7180/ProductCategory/delete-productcategorybyid/"+id, { headers: this.headers });
   }

   Update(body: categoryUpdate){
    return this.http.put<any>("https://localhost:7180/ProductCategory/update-productcategory", JSON.stringify(body), { headers: this.headers });
   }

   getbyid(id:number) : Observable<Categories> {
    return this.http.get<Categories>("https://localhost:7180/ProductCategory/get-productcategorybyid/"+id,{ headers: this.headers });
   }
}