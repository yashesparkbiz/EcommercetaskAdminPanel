import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { convertToParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/_models/categories.model';
import { Product } from 'src/app/_models/product.model';
import { Subcategories } from 'src/app/_models/subcategories.model';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductsService } from 'src/app/_services/products.service';
import { SubcategoriesService } from 'src/app/_services/subcategories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productdata!: Observable<Product[]>;
  product!: Product;
  editProductForm!: FormGroup;
  categoriesdata!: Observable<Categories[]>;
  subcategoriesdata!: Subcategories[];
  errorMessage1: string = '';
  Message1: string = '';
  isUpdate!: boolean;
  constructor(private productsService: ProductsService, private subcategoriesService: SubcategoriesService, private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      product_Name: new FormControl(''),
      description: new FormControl(''),
      brand: new FormControl(''),
      price: new FormControl(''),
      product_Subcategory_Id: new FormControl(''),
      quantity: new FormControl(''),
      image: new FormControl('')
    });
    this.getcategorydata(); 
    this.getallproducts();
  }

  async getallproducts() {
    debugger
    this.productdata = this.productsService.get();
  }

  changeCategory(e: any) {
    var categoryid = e.target.value;
    this.getSubCategorydata((Number)(categoryid));
  }

  getSubCategorydata(categoryid: number) {
    debugger
    this.subcategoriesService.getbycategoryid(categoryid).subscribe(res => {
      this.subcategoriesdata = res;
    });
  }

  getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  async setproductid(id: number) {
    await this.productsService.getbyid(id).subscribe(res => {
      this.product = res;
      this.callmodel(res);
    });
  }

  callmodel(data: Product) {
    this.editProductForm.controls["product_Name"].setValue(data.product_Name);
    this.editProductForm.controls["description"].setValue(data.description);
    this.editProductForm.controls["brand"].setValue(data.brand);
    this.editProductForm.controls["price"].setValue(data.price);
    this.editProductForm.controls["quantity"].setValue(data.quantity);
    document.getElementById('openModalButton')?.click();
  }

  deleteproduct(id: number) {
    var check = confirm('Are you sure you want to delete product?');
    if (check == true) {
      this.productsService.delete(id).subscribe(res => {
        if (res == true) {
          alert("product deleted successfully");
        }
      });
    }
  }

  clearmessages() {
    this.errorMessage1 = '';
    this.Message1 = '';
  }

  editProduct(data: any) {
    debugger
    if (data.product_Name != "" && data.description != "" && data.brand != "" &&  data.quantity > 0) {
      const productdata: Product =
      {
        id: (Number)(this.product.id),
        product_Name: data.product_Name,
        description: data.description,
        brand: data.brand,
        price: (Number)(data.price),
        product_Subcategory_Id: (Number)(data.product_Subcategory_Id),
        quantity: (Number)(data.quantity),
        image: "6.jpg",
        is_Active: true,
        user_Id: (Number)(this.product.user_Id)
      }
      this.productsService.updateProduct(productdata).subscribe(res => {
        this.isUpdate = res;
        if (this.isUpdate == true) {
          alert("Product updated successfully");
          this.router.navigate(['/products']);
        }
      });
    }
  }
}