import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'modules/shared/services/data.service';

@Component({
    selector:'app-product-details',
    templateUrl:'.product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})


export class ProductDetails implements OnInit{

    constructor(private service: DataService
    ) {}

    ngOnInit(){
        
    }
}