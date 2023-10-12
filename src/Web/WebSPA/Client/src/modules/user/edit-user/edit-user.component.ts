import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IUserDetails } from 'modules/shared/models/userdetails.model';
import { SecurityService } from 'modules/shared/services/security.service';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'edit-user-app',
    styleUrls: ['./edit-user.component.scss'],
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit{

    userDetails:IUserDetails;
    username:string = '';
    userForm:UntypedFormGroup;
    constructor(private securityService:SecurityService,
        fb:UntypedFormBuilder){
        this.userForm = fb.group({
            name: [this.securityService.UserData.name],
            lastname: [this.securityService.UserData.name],
            country: [this.securityService.UserData.address_country, [Validators.nullValidator]],
            zipcode: [this.securityService.UserData.address_zip_code, [Validators.nullValidator]],
            street: [this.securityService.UserData.address_street, [Validators.nullValidator]],
            state: [this.securityService.UserData.address_state, [Validators.nullValidator]],
            cardholdername:[this.securityService.UserData.card_holder, [Validators.nullValidator]],
            cardnumber:[this.securityService.UserData.card_number, [Validators.nullValidator]],
            cardsecuritynumber:[this.securityService.UserData.card_security_number, [Validators.nullValidator]],
            cardexpiration:[this.securityService.UserData.card_expiration, [Validators.nullValidator]]


    });
}
    ngOnInit() {
        this.username =  this.securityService.UserData.email;
        this.userDetails = {
            id:  this.securityService.UserData.sub,
            name: this.securityService.UserData.name,
            last_name : this.securityService.UserData.last_name,
            address_street : this.securityService.UserData.address_street,
            address_city : this.securityService.UserData.address_city,
            address_country : this.securityService.UserData.address_country,
            address_state : this.securityService.UserData.address_state,
            address_zip_code :  this.securityService.UserData.address_zip_code,
            card_expiration : this.securityService.UserData.card_expiration,
            card_number : this.securityService.UserData.card_number,
            cards_security_number : this.securityService.UserData.card_security_number,
            card_type_id : 1,
            card_holder : this.securityService.UserData.card_holder
        }   
    }

    submitForm(value:any){
        this.userDetails.address_state = this.userForm.controls['state'].value;
        this.userDetails.address_country = this.userForm.controls['country'].value;
        this.userDetails.card_number = this.userForm.controls['cardnumber'].value;
        this.userDetails.card_holder = this.userForm.controls['cardholdername'].value;
        this.userDetails.card_expiration = this.userForm.controls['cardexpiration'].value;
        this.userDetails.cards_security_number = this.userForm.controls['cardsecuritynumber'].value;
        this.userDetails.address_zip_code = this.userForm.controls['zipcode'].value;
        this.userDetails.address_street = this.userForm.controls['street'].value;

        console.log("id = "+this.userDetails.id);
        console.log(this.userDetails);
    }


}
