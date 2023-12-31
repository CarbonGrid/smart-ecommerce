import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BasketService } from './basket.service';
import { IBasket } from '../shared/models/basket.model';
import { IBasketItem } from '../shared/models/basketItem.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BasketWrapperService } from '../shared/services/basket.wrapper.service';
import { Payment } from './basket-payment/basket-payment.component';

@Component({
    selector: 'esh-basket .esh-basket .mb-5',
    styleUrls: ['./basket.component.scss'],
    templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit {
    errorMessages: any;
    basket: IBasket;
    totalPrice: number = 0;

    constructor(private basketSerive: BasketService, private router: Router, private basketWrapperService: BasketWrapperService, private modalService:NgbModal) { }

    ngOnInit() {
        this.basketSerive.getBasket().subscribe(basket => {
            this.basket = basket;
            this.calculateTotalPrice();
        });
    }

    deleteItem(id: String) {
        this.basket.items = this.basket.items.filter(item => item.id !== id);
        this.calculateTotalPrice();
        
        this.basketSerive.setBasket(this.basket).subscribe(x => 
            {
                this.basketSerive.updateQuantity();
                console.log('basket updated: ' + x)
            }
        );
    }

    itemQuantityChanged(item: IBasketItem, quantity: number) {
        item.quantity = quantity > 0 ? quantity : 1;
        this.calculateTotalPrice();
        this.basketSerive.setBasket(this.basket).subscribe(x => console.log('basket updated: ' + x));
    }

    open(){
        const modal = this.modalService.open(Payment,{ size: 'md', backdrop: 'static' });
        modal.componentInstance.fromParent = this.totalPrice;
        modal.result.then((result) =>{
            console.log(result);
        })
        
    }

    update(event: any): Observable<boolean> {
        let setBasketObservable = this.basketSerive.setBasket(this.basket);
        setBasketObservable
            .subscribe(
            x => {
                this.errorMessages = [];
                console.log('basket updated: ' + x);
            },
            errMessage => this.errorMessages = errMessage.messages);
        return setBasketObservable;
    }

    checkOut(event: any) {
        this.update(event)
            .subscribe(
                x => {
                    this.errorMessages = [];
                    this.basketWrapperService.basket = this.basket;
                    this.router.navigate(['order']);
        });
    }

    private calculateTotalPrice() {
        this.totalPrice = 0;
        this.basket.items.forEach(item => {
            this.totalPrice += (item.unitPrice * item.quantity);
        });
    }
}
