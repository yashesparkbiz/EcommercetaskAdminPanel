import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from 'src/app/_models/order';
import { Orderdetail } from 'src/app/_models/orderdetail';
import { OrderdetailsService } from 'src/app/_services/orderdetails.service';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderdata!: Observable<Array<Order>>;
  orderdetailsdata!: Array<Orderdetail>;
  delorderdetailsdata!: Array<Orderdetail>;
  constructor(private ordersService: OrdersService, private orderdetailsService: OrderdetailsService, public router: Router) { }

  ngOnInit(): void {
    this.getorderdata();
  }

  getorderdata() {
    if (localStorage.getItem('token')?.toString() != undefined && localStorage.getItem('token')?.toString() != "") {
      this.orderdata = this.ordersService.get();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  viewOrder(id: number) {
    this.orderdetailsService.getbyorderid(id).subscribe(res => {
      this.orderdetailsdata = res;
      document.getElementById('openModalButton')?.click();
    })
  }

  deleteOrder(id: number) {
    var res = confirm("Are u sure you want to delete order?");
    if (res == true) {
      debugger
      this.ordersService.delete(id).subscribe(res => {
        if (res == true) {
          document.getElementById('btnclose')?.click();
          this.ngOnInit();
        }
      });
    }
  }
}
