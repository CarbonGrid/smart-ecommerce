import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from './shared/services/security.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { SignalrService } from './shared/services/signalr.service';
import { ToastrService } from 'ngx-toastr';
import { ICarouselImage } from './shared/models/carouselImage';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'esh-app',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    Authenticated: boolean = false;
    subscription: Subscription;

    parentImages: ICarouselImage[] = [
        {
          src: '/assets/images/header.jpg',
          caption: 'Standard digital clock',
          alt: ''
        },
        {
          src: '/assets/images/logo.svg',
          caption: 'Digital clock with date, weather, and steps',
          alt: ''
        },
        {
          src: '/assets/images/smart-ecommerce.jpg',
          caption: 'Pokemon themed watch face',
          alt: '',
        }
      ];

    constructor(private titleService: Title,
        public router: Router,
        private securityService: SecurityService,
        private configurationService: ConfigurationService,
        private signalrService: SignalrService,
        private toastr: ToastrService,
        vcr: ViewContainerRef
    ) {
        // TODO: Set Taster Root (Overlay) container
        //this.toastr.setRootViewContainerRef(vcr);
        this.Authenticated = this.securityService.IsAuthorized;
    }

    ngOnInit() {
        console.log('app on init');
        this.subscription = this.securityService.authenticationChallenge$.subscribe(res => this.Authenticated = res);

        //Get configuration from server environment variables:
        console.log('configuration');
        this.configurationService.load();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle('eShopOnContainers');
    }
    
    public returnHome(){
        this.router.navigate(['/catalog'])
    }
    
}
