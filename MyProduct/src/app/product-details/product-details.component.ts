import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../models/product';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
            FormsModule, RouterModule, CommonModule, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit {
  product? =  {} as Product;
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  loading = true;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProduct(productId);
  }

  loadProduct(id: string) {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.loading = false;
      },
      error: (error: Error) => {
        // alert is for demo purposes only
        alert(error.message);
        this.loading = false;
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
