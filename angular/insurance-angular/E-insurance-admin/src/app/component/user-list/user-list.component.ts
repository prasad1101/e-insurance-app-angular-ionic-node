import { Component, OnInit } from '@angular/core';
import { DalService } from './../../services/dal.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private dal: DalService) { }

  ngOnInit() {
    this.getCustomerList();
  }


  customers: any;
  getCustomerList() {

    this.dal.getCustomer().subscribe(y => {

      this.customers = y;
      console.log(y);

    })

  }




}
