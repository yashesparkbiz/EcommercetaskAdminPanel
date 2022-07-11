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

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'subcategories', component: SubcategoriesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component:ProductsComponent},
  { path: 'orders', component:OrdersComponent}
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
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }