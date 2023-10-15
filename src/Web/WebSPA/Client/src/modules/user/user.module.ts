import { ModuleWithProviders, NgModule }             from '@angular/core';
import { BrowserModule  }       from '@angular/platform-browser';
import { SharedModule }         from '../shared/shared.module';

import { EditUserComponent } from './edit-user/edit-user.component';
import { SecurityService } from 'modules/shared/services/security.service';
import { UserService } from './user.service';


@NgModule({
    imports: [BrowserModule,SharedModule],
    declarations: [EditUserComponent],
    providers: [UserService],
    exports:[EditUserComponent]
})
export class UserModule {
    static forRoot(): ModuleWithProviders<UserModule>{
        return {
            ngModule:UserModule,
            providers:[
                UserService
            ]
        };
    }
 }
