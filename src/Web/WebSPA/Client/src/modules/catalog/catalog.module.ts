import { NgModule }             from '@angular/core';
import { BrowserModule  }       from '@angular/platform-browser';
import { CommonModule }         from '@angular/common'
import { SharedModule }         from '../shared/shared.module';
import { CatalogComponent }     from './catalog.component';
import { CatalogService }       from './catalog.service';
import { Pager }                from '../shared/components/pager/pager';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchProductComponent } from './search-product/search-product.component';


 
@NgModule({
    imports: [BrowserModule, NgbModule, SharedModule, CommonModule],
    declarations: [CatalogComponent, ManageProductComponent, SearchProductComponent, EditProductComponent],
    providers: [CatalogService]
})
export class CatalogModule { }
