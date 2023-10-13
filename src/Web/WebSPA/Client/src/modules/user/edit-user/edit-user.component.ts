import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IUserDetails } from 'modules/shared/models/userdetails.model';
import { SecurityService } from 'modules/shared/services/security.service';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import {ToastrService} from 'ngx-toastr';

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
        fb:UntypedFormBuilder, private userService:UserService, private toastr:ToastrService){
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
            lastName : this.securityService.UserData.last_name,
            street : this.securityService.UserData.address_street,
            city : this.securityService.UserData.address_city,
            country : this.securityService.UserData.address_country,
            state : this.securityService.UserData.address_state,
            zipCode :  this.securityService.UserData.address_zip_code,
            expiration : this.securityService.UserData.card_expiration,
            cardNumber : this.securityService.UserData.card_number,
            securityNumber : this.securityService.UserData.card_security_number,
            cardType : 1,
            cardHolderName : this.securityService.UserData.card_holder
        }   
    }

    submitForm(){
        this.userDetails.state = this.userForm.controls['state'].value;
        this.userDetails.country = this.userForm.controls['country'].value;
        this.userDetails.cardNumber = this.userForm.controls['cardnumber'].value;
        this.userDetails.cardHolderName = this.userForm.controls['cardholdername'].value;
        this.userDetails.expiration = this.userForm.controls['cardexpiration'].value;
        this.userDetails.securityNumber = this.userForm.controls['cardsecuritynumber'].value;
        this.userDetails.zipCode = this.userForm.controls['zipcode'].value;
        this.userDetails.street = this.userForm.controls['street'].value;

        this.userService.updateUser(this.userDetails).subscribe(
            x => {
                this.toastr.success('Edited Successfully');
            },
            (error) => {
                this.toastr.error('Failed to update');
            }
        )
    }
}
