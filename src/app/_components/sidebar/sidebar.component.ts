import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication-service.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authservice:AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout();
    this.router.navigate(["login"]);
  }
}
