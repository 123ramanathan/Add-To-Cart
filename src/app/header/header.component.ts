import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import {
  MatDialog
} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
name: any = "Sriram"
  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
  }

  add_product(){
    console.log("Add Product");
    this.modal.open(AddProductComponent,{
      data: {name: this.name},
      panelClass: 'custom-modal'
    });
  }

}
