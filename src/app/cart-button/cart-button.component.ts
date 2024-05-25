import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DbService } from '../db.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class CartButtonComponent implements OnInit {
@Output() add_to_cart = new EventEmitter();
@Input() cart_data: any
@Input() cart_qty: any
@Input() all_product: any
cart_datas: any = []
  constructor(public db: DbService) { }

  ngOnInit(): void {
    this.db.get_cart_items()

    this.all_product.map((allDatas: any,index: any) => {
      this.cart_qty.map((qty_data : any,i: any) => {
        if(allDatas.id == qty_data.id){
          allDatas.qty = qty_data.qty
        }
      })
    })

    this.db.update_cart_datas.subscribe((res: any) => {
      if(res == 'Success' && this.db.cart_button_increase){
        this.all_product.map((allDatas: any,index: any) => {
          this.cart_qty.map((qty_data : any,i: any) => {
            if(allDatas.id == qty_data.id){
              allDatas.qty = qty_data.qty
            }
          })
        })
      }
      this.db.cart_button_increase = false;
    })
  }

  add_cart(){
    this.add_to_cart.emit(this.cart_data)
  }

  update_cart(data: any,type: any){
    if(type == 'add'){
      this.db.add_to_cart(data,'add')
    }else {
      this.db.add_to_cart(data,'reduce')
    }
  }

}
