import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  name: any;
  base64String: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private _mdr: MatDialogRef<AddProductComponent>,) {
    this.name = data.name;
   }

  ngOnInit(): void {
    console.log(this.name)
  }

  close_dialog(){
    this._mdr.close();
  }

  file_input(){
    console.log("file input")
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.base64String = e.target.result as string;
        console.log('Base64 encoded file:', this.base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  add_product(){
    console.log("add product")
  }

}
