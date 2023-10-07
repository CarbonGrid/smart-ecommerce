import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './model/manage-product.model';
import { ManageProductService } from './service/manage-product.service';

@Component({
    selector: 'app-manage-product',
    templateUrl: './manage-product.component.html',
    styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {
    product: Product = { title: '', description: '', price: 0, imageBase64: '' };

    constructor(private productService: ManageProductService) { }

    onImageUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.product.imageBase64 = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    onSubmit() {
        this.productService.addProduct(this.product);
        this.product = { title: '', description: '', price: 0, imageBase64: '' };
    }
}