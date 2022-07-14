import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/_interfaces/user-model';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userdata!: Observable<User[]>;
  user!: User;
  errorMessage1: string = '';
  Message1: string = '';
  updateUserForm!: FormGroup;

  constructor(private userservice: UsersService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')?.toString() != undefined && localStorage.getItem('token')?.toString() != "") {
      this.updateUserForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl(''),
        gender: new FormControl(''),
        age: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('')
      });

      this.getallUsers();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  getallUsers() {
    this.userdata = this.userservice.getall();
  }

  async setuserid(id: number) {
    await this.userservice.getbyid(id).subscribe(res => {
      this.user = res;
      this.callmodel(res);
    });
  }

  callmodel(data: User) {
    this.updateUserForm.controls["userName"].setValue(data.userName);
    this.updateUserForm.controls["email"].setValue(data.email);
    this.updateUserForm.controls["phoneNumber"].setValue(data.phoneNumber);
    this.updateUserForm.controls["gender"].setValue(data.gender);
    this.updateUserForm.controls["age"].setValue(data.age);
    this.updateUserForm.controls["password"].setValue(data.password);
    this.updateUserForm.controls["confirmPassword"].setValue(data.password);
    document.getElementById('openModalButton')?.click();
  }

  deleteuser(id: number) {
    debugger
    var check = confirm('Are you sure you want to delete User?');
    if (check == true) {
      this.userservice.delete(id).subscribe(res => {
        if (res == true) {
          alert("SubCategory deleted successfully;");
          this.ngOnInit();
        }
      });
    }
  }

  clearmessages() {
    this.errorMessage1 = '';
    this.Message1 = '';
  }

  editUser(data: any) {
    if (data.userName != "" && data.email != "" && data.phoneNumber != "" && data.gender != "" && data.age > 0 && data.password != "" && data.confirmPassword != "" && data.password == data.confirmPassword) {
      var userdata: User = {
        id: (Number)(this.user.id),
        age: data.age,
        gender: data.gender,
        email: data.email,
        phoneNumber: data.phoneNumber,
        userName: data.userName,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: ""
      }
      this.userservice.Update(userdata).subscribe(res => {
        // alert(res);
        this.Message1 += "- data updated successfully";
        this.errorMessage1 = "";
        this.ngOnInit();
      })
    }
  }

  getuserrolewise(role: string) {
    this.userdata = this.userservice.getbyrole(role);
  }
}