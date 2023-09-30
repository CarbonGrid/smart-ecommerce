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
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy1.png?t=2022-09-01T22%3A04%3A27.297Z',
          caption: 'Standard digital clock',
          alt: ''
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy2.png?t=2022-09-01T22%3A06%3A12.323Z',
          caption: 'Digital clock with date, weather, and steps',
          alt: ''
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy3.png',
          caption: 'Pokemon themed watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy5.png',
          caption: 'Tetris themed watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy6.png',
          caption: 'Paint program themed watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy7.png',
          caption: 'Sports watch themed face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy8.png',
          caption: 'Binary watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy9.png',
          caption: 'Fancy watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy12.jpg',
          caption: 'Cat face watch face',
          alt: '',
        },
        {
          src: 'https://zwkbcfekyorurkjubugn.supabase.co/storage/v1/object/public/bucks/watchy_faces/watchy14.png',
          caption: 'PowerShell themed watch face',
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
