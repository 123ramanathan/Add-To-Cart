import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  domainUrl : any;
  product_data: any;
  cart_datas : any = []
  update_cart_datas = new Subject();
  cart_button_increase = false

  constructor(private http: HttpClient) {
    this.domainUrl = 'http://localhost:4200'
   }

  get_product_list(): Observable<any>{
    return  this.http.get('../assets/data.json');
  }

  get_cart_items(){
    if(localStorage['cart_items']){
      this.cart_datas = JSON.parse(localStorage['cart_items']) 
    }else{
      this.cart_datas = []
    }
  }

  add_to_cart(data: any,type: any){
    let already_exist;

    if(this.cart_datas && this.cart_datas.length != 0){
      this.cart_datas.map((res_cart : any,index: any) => {
        if(res_cart.id == data.id){
          if(type == 'add'){
            res_cart.qty = res_cart.qty ? res_cart.qty + 1 : 1
          }else{
            res_cart.qty = res_cart.qty - 1
          }
          this.cart_datas[index] = res_cart
          already_exist = true;
        }
      });

      if (!already_exist) {
        data.qty = 1;
        this.cart_datas.push(data);
      }

    }else {
      data.qty = data.qty ? data.qty + 1 : 1
      this.cart_datas.push(data)
    }

    localStorage['cart_items'] = JSON.stringify(this.cart_datas)
    this.get_cart_items()
    this.cart_button_increase = true;
    this.update_cart_datas.next('Success')
  }
}

