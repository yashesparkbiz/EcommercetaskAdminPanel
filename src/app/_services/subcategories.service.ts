import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subcategoryUpdate } from '../_components/subcategories/subcategories.component';
import { SubCategory } from '../_interfaces/sub-category';
import { Subcategories, Subcategorieswithcategoryname } from '../_models/subcategories.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getAll() : Observable<Array<Subcategorieswithcategoryname>> {
    debugger
    return this.http.get<Array<Subcategorieswithcategoryname>>("https://localhost:7180/ProductSubCategory/get-all-product-subcategory-withcategoryname", { headers: this.headers });
  }

  add(body : SubCategory){
    return this.http.post<any>("https://localhost:7180/ProductSubCategory/add-product-subcategory", JSON.stringify(body), { headers: this.headers });
  }
   
  delete(id:number){
    return this.http.delete("https://localhost:7180/ProductSubCategory/delete-product-subcategorybyid/"+id, { headers: this.headers });
  }

  Update(body : subcategoryUpdate) {
    return this.http.put<any>("https://localhost:7180/ProductSubCategory/update-product-subcategory", JSON.stringify(body) ,{ headers: this.headers });
  }

  getbyid(id: number) : Observable<Subcategories>{
    return this.http.get<Subcategories>("https://localhost:7180/ProductSubCategory/get-product-subcategorybyid/"+id, { headers: this.headers })
  }
}