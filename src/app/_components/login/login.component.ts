import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDto } from 'src/app/_interfaces/auth-response-dto';
import { User } from 'src/app/_interfaces/user';
import { AuthenticationService } from 'src/app/_services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    debugger
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: User = {
      in: {
        email: login.username,
        password: login.password,
        rememberMe: true
      }
    }
    this.authService.loginUser('Users/login', userForAuth)
      .subscribe({
        next: (res: AuthResponseDto) => {
          debugger
          var isAdmin!:boolean;
          var iscustomer!: boolean;
          for(let i=0; i<res.role.length; i++)
          {
            if(res.role[i] == "Admin")
            {
              isAdmin = true;
            }
            else if(res.role[i] == "Customer")
            {
              iscustomer = true;
            }
          }
          if (isAdmin == true) {
            this.getuserbyemail(login.username);
            localStorage.setItem("token", res.token);
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
            this.router.navigate([this.returnUrl]);
            alert("login done successfully.");
          }
          else if(iscustomer == true){
            window.location.href = 'http://localhost:4200';
          }
          else{
            alert("please enter valid details");
            this.router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  getuserbyemail(email: string) {
    this.authService.getuserbyemail(email).subscribe(data => {
      localStorage.setItem("id", data.id.toString());
    });
  }
}