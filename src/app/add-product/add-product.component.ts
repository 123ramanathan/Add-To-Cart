import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../db.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  name: any;
  base64String: any;
  title: any;
  description:any;
  price: any;
  fil_name: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private _mdr: MatDialogRef<AddProductComponent>,public db: DbService) {
    this.name = data.name;
   }

  ngOnInit(): void {
    // console.log(this.name)
  }

  close_dialog(){
    this._mdr.close();
  }

  file_input(){
    console.log("file input")
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    // console.log('input',input)

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // console.log('File:', file);

      // Accessing file name
      this.fil_name = file.name;
      // console.log('this.fil_name:', this.fil_name);

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.base64String = e.target.result as string;
        // console.log('Base64 encoded file:', this.base64String);
      };

      reader.readAsDataURL(file);
    }
}


  add_product(){
    // console.log("add product")

    let data: any = {
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.base64String
    }

    let send_id = this.db.product_data.length - 1
    data.id = send_id + 2

    this.db.product_data.push(data)

    this.db.new_products.push(data)

    localStorage['new_products'] = JSON.stringify(this.db.new_products)

    console.log(this.db.product_data,'this.db.product_data');
    console.log(data,'data');
    this._mdr.close();
    
  }

}
