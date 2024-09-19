import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ProductService } from './../services/product.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { Router } from '@angular/router';
import { Product } from './../models/product'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
            FormsModule, RouterModule, CommonModule,
            ProductCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  router = inject(Router);
  productService = inject(ProductService);

  loading = true;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = this.products;
        this.loading = false;
      },
      error: (error: Error) => {
        // alert is for demo purposes only
        alert(error.message);
        this.loading = false;
      }
    });
  }

  searchProducts(input: any): void {
    const searchQuery = input?.trim()?.toLowerCase();

    if (!searchQuery) {
      this.filteredProducts = this.products;
      return;
    } 

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery)
      || product.description.toLowerCase().includes(searchQuery)
    );
    
  }

  goToProductDetails(productId: string) {
    // Navigate to the details page
    this.router.navigate(['/product-details', productId]);
  }
}

