import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/manage-product.model';

@Injectable({
  providedIn: 'root',
})
export class ManageProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.productsSubject.asObservable();
  }

  // Add a new product to the backend API
  addProduct(product: Product) {
    // API endpoint is /api/v1/Catalog/items
    const apiUrl = '/api/v1/Catalog/items';

    // Send a POST request to the API with the product data
    this.http.post(apiUrl, product).subscribe(
      (response: Product) => {
        // If the POST request is successful, Update the local data
        this.products.push(response);
        this.productsSubject.next([...this.products]);
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }
}