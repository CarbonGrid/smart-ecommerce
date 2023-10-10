import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/manage-product.model';
import { DataService } from 'modules/shared/services/data.service';
import { ConfigurationService } from 'modules/shared/services/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ManageProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);

  private catalogUrl: string = '';
  private brandUrl: string = '';
  private typesUrl: string = '';
  private productUrl: string = '';

  constructor(private http: HttpClient, private service: DataService, private configurationService: ConfigurationService) {
    this.configurationService.settingsLoaded$.subscribe(x => {
      this.catalogUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/items';
    });
  }

  getProducts() {
    return this.productsSubject.asObservable();
  }

  // Add a new product to the backend API
  // addProduct(product: Product) {
  //   // API endpoint:
  //   const apiUrl = this.catalogUrl;
  //   console.log(product);


  //   // Send a PUT request to the API with the product data
  //   this.http.put(apiUrl, product).subscribe(
  //     (response: Product) => {
  //       // If the POST request is successful, Update the local data
  //       this.products.push(response);
  //       this.productsSubject.next([...this.products]);
  //     },
  //     (error) => {
  //       console.error('Error adding product:', error);
  //     }
  //   );
  // }

  // Modify the addProduct method to return an Observable<Product>
  addProduct(product: Product): Observable<Product> {
    // API endpoint:
    const apiUrl = this.catalogUrl;

    // Send a PUT request to the API with the product data
    return this.http.put<Product>(apiUrl, product);
  }
}