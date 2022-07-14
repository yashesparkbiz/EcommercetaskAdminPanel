import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubCategory } from 'src/app/_interfaces/sub-category';
import { Categories } from 'src/app/_models/categories.model';
import { Subcategories, Subcategorieswithcategoryname } from 'src/app/_models/subcategories.model';
import { CategoriesService } from 'src/app/_services/categories.service';
import { SubcategoriesService } from 'src/app/_services/subcategories.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  subcategoriesdata!: Observable<Subcategorieswithcategoryname[]>;
  errorMessage: string = '';
  Message: string = '';
  errorMessage1: string = '';
  Message1: string = '';
  addSubCategoryForm!: FormGroup;
  updateSubCategoryForm!: FormGroup;
  categoriesdata!: Observable<Categories[]>;
  subcategory!: Subcategories;

  constructor(private subcategoriesService: SubcategoriesService, private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')?.toString() != undefined && localStorage.getItem('token')?.toString() != "") {
      this.addSubCategoryForm = new FormGroup({
        name: new FormControl(''),
        categoryid: new FormControl('')
      });

      this.updateSubCategoryForm = new FormGroup({
        name: new FormControl(''),
        categoryid: new FormControl('')
      });

      this.getSubcategoriesdata();
      this.getcategorydata();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  async getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  getSubcategoriesdata() {
    this.subcategoriesdata = this.subcategoriesService.getAll();
  }

  async setSubCategoryid(id: number) {
    await this.subcategoriesService.getbyid(id).subscribe(res => {
      this.subcategory = res;
      this.callmodel(res);
    });
  }

  callmodel(data: Subcategories) {
    this.updateSubCategoryForm.controls["name"].setValue(data.name);
    this.updateSubCategoryForm.controls["categoryid"].setValue(data.categoryid);
    document.getElementById('openModalButton')?.click();
  }

  editSubCategory(data: any) {
    if (data.name == '' || data.name == null || data.name == undefined || data.categoryid == 0) {
      this.errorMessage1 += "- Please enter subcategory name ";
    }
    else {
      var subcategorydata: subcategoryUpdate = {
        id: this.subcategory.id,
        name: data.name,
        categoryid: data.categoryid
      }
      this.subcategoriesService.Update(subcategorydata).subscribe(res => {
        alert(res);
        this.Message1 += "- data updated successfully";
        this.errorMessage1 = "";
        this.ngOnInit();
      })
    }
  }

  deleteSubCategory(id: number) {
    var check = confirm('Are you sure you want to delete Category?');
    if (check == true) {
      this.subcategoriesService.delete(id).subscribe(res => {
        if (res == true) {
          alert("SubCategory deleted successfully;");
          this.ngOnInit();
        }
      });
    }
  }

  addSubCategory(data: any) {
    if (data != undefined || data != null || data.name != "" || data.categoryid > 0) {
      var subcategorydata: SubCategory = {
        in: {
          id: 0,
          name: data.name,
          categoryid: data.categoryid
        }
      }
      this.subcategoriesService.add(subcategorydata).subscribe(res => {
        alert(res);
        this.Message += "- data added successfully";
        this.errorMessage = "";
        this.ngOnInit();
      })
    }
  }

  clearmessages() {
    this.errorMessage1 = "";
    this.Message1 = "";
  }
}

export interface subcategoryUpdate {
  id: number,
  name: string,
  categoryid: number
}