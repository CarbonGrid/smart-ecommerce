import { NgModule }             from '@angular/core';
import { BrowserModule  }       from '@angular/platform-browser';
import { CommonModule }         from '@angular/common'
import { SharedModule }         from '../shared/shared.module';

import { EditUserComponent } from './edit-user/edit-user.component';
import { SecurityService } from 'modules/shared/services/security.service';


@NgModule({
    imports: [BrowserModule,SharedModule],
    declarations: [EditUserComponent],
    providers: [SecurityService]
})
export class UserModule { }
