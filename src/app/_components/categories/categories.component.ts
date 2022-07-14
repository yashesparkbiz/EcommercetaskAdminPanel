import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/_interfaces/category';
import { Categories } from 'src/app/_models/categories.model';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesdata!: Observable<Categories[]>;
  addCategoryForm!: FormGroup;
  errorMessage: string = '';
  Message: string = '';
  errorMessage1: string = '';
  Message1: string = '';
  category!: Categories;
  updateCategoryForm!: FormGroup;

  constructor(private categoriesService: CategoriesService, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')?.toString() != undefined && localStorage.getItem('token')?.toString() != "") {
      this.addCategoryForm = new FormGroup({
        name: new FormControl('')
      });

      this.updateCategoryForm = new FormGroup({
        name: new FormControl('')
      });

      this.getcategorydata();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  getcategorydata() {
    this.categoriesdata = this.categoriesService.get();
  }

  addCategory(data: any) {
    if (data.name == '' || data.name == null || data.name == undefined) {
      this.errorMessage += "- Please enter category name ";
    }
    else {
      var categorydata: Category = {
        in: {
          id: 0,
          name: data.name,
          is_Active: true
        }
      }
      this.categoriesService.add(categorydata).subscribe(res => {
        alert(res);
        this.Message += "- data added successfully";
        this.errorMessage = "";
        this.ngOnInit();
      })
    }
  }


  editCategory(data: any) {
    debugger
    if (data.name == '' || data.name == null || data.name == undefined) {
      this.errorMessage1 += "- Please enter category name ";
    }
    else {
      var categorydata: categoryUpdate = {
        id: this.category.id,
        name: data.name,
        is_Active: true
      }
      this.categoriesService.Update(categorydata).subscribe(res => {
        alert(res);
        this.Message1 += "- data updated successfully";
        this.errorMessage1 = "";
        this.ngOnInit();
      })
    }
  }

  deleteCategory(id: number) {
    var check = confirm('Are you sure you want to delete Category?');
    if (check == true) {
      this.categoriesService.delete(id).subscribe(res => {
        if (res == true) {
          alert("Category deleted successfully;");
          this.ngOnInit();
        }
      });
    }
  }

  async setcategoryid(id: number) {
    await this.categoriesService.getbyid(id).subscribe(res => {
      this.category = res;
      this.callmodel(res);
    });
  }

  callmodel(data: Categories) {
    this.updateCategoryForm.controls["name"].setValue(data.name);
    document.getElementById('openModalButton')?.click();
  }
}


export interface categoryUpdate {
  id: number,
  name: string,
  is_Active: true
}