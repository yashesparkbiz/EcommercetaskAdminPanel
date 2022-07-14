import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getall() : Observable<Array<User>>{
    return this.http.get<Array<User>>("https://localhost:7180/Users/get-all-user", {headers: this.headers});
  }

  getbyid(id:number):Observable<User>{
    return this.http.get<User>("https://localhost:7180/Users/get-user-byid/"+id, {headers:this.headers});
  }

  delete(id:number){
    debugger
    return this.http.delete("https://localhost:7180/Users/delete-user-byid/"+id,{headers:this.headers});
  }

  Update(body: User){
    return this.http.put("https://localhost:7180/Users/update-user", JSON.stringify(body),{headers:this.headers});
  }

  getbyrole(role:string): Observable<Array<User>>{
    return this.http.get<Array<User>>("https://localhost:7180/Users/get-user-byrole/"+role,{headers: this.headers});
  }
}
