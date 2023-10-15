import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IUserDetails } from 'modules/shared/models/userdetails.model';
import { ConfigurationService } from 'modules/shared/services/configuration.service';
import { DataService } from 'modules/shared/services/data.service';
import { SecurityService } from 'modules/shared/services/security.service';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';



@Injectable()
export class UserService {
    private updateUrl: string= '';

    constructor(private http:HttpClient, private configurationService:ConfigurationService,
        private dataService:DataService){
            this.updateUrl = this.configurationService.serverSettings.identityUrl;
    }

    updateUser(user :IUserDetails):Observable<boolean>{
        let url = this.updateUrl+'/api/v1/profile/user';
        return this.dataService.post(url,user).pipe<boolean>(tap((response:any) =>{
            if(response.status === 204){
                return true;
            }
            else{
                return false;
            }
        }
        ));
    }

}