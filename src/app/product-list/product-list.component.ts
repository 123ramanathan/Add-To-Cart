import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // product_data: any;

  constructor(public db: DbService) { }

  ngOnInit(): void {
    this.get_product()
    this.db.get_cart_items()
  }
  cart_new: any;
  get_product(){
    this.db.get_product_list().subscribe(res => {
      // console.log(res);
      this.db.product_data = res
      this.db.get_new_product()
    });
  }

}
