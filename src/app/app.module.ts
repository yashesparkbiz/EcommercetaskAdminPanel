import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { HeaderComponent } from './_components/header/header.component';
import { CategoriesComponent } from './_components/categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubcategoriesComponent } from './_components/subcategories/subcategories.component';
import { UsersComponent } from './_components/users/users.component';
import { ProductsComponent } from './_components/products/products.component';
import { OrdersComponent } from './_components/orders/orders.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterUserComponentComponent } from './_components/register-user-component/register-user-component.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication-service.service';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("token");
}

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'subcategories', component: SubcategoriesComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'products', component:ProductsComponent, canActivate: [AuthGuard]},
  { path: 'orders', component:OrdersComponent, canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterUserComponentComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    LoginComponent,
    RegisterUserComponentComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:54155"],
        //disallowedRoutesRoutes: []
      }
    }),
  ],
  exports: [RouterModule],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }