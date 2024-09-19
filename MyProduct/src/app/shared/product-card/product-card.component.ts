import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Product } from './../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCardComponent  {
  @Input() product = {}  as Product;
}