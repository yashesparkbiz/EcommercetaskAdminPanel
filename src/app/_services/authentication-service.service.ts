import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthResponseDto } from '../_interfaces/auth-response-dto';
import { RegistrationResponseDto } from '../_interfaces/registration-response-dto';
import { User } from '../_interfaces/user';
import { UsersModel } from '../_interfaces/user-model';
import { TokenModel } from '../_models/token-model';
import { Users } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers!: HttpHeaders;
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  user!: User;
  public isauthenticate!: boolean;
  
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  public registerUser = (route: string, body: UsersModel) => {
    debugger
    return this.http.post<RegistrationResponseDto> ("https://localhost:7180/Users/create-user", body, {headers:this.headers});
  }

  public loginUser = (route: string, body: User) => {
    return this.http.post<AuthResponseDto>("https://localhost:7180/Users/login", body, {headers:this.headers});
  }

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token!=null && !this.jwtHelper.isTokenExpired(token) ? true : false;
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    debugger
    this.authChangeSub.next(isAuthenticated);
    this.isauthenticate = isAuthenticated;
  }

  public getuserbyemail(email:string) : Observable<Users>{
    return this.http.get<Users>("https://localhost:7180/Users/get-user-byemail/"+email, { headers: this.headers });
  }

  public refreshtoken(tokenModel:TokenModel): Observable<TokenModel>{
    return this.http.post<TokenModel>("https://localhost:7180/Users/refresh-token", JSON.stringify(tokenModel), { headers: this.headers });
  }
}
