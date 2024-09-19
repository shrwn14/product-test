import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all products', () => {
    const dummyProducts: Product[] = [
      { _id: '1', id: 1, name: 'Product 1', description: 'product1', price: 100, discount: 10 },
      { _id: '2', id: 2, name: 'Product 2', description: 'product1', price: 200, discount: 0 }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should retrieve a product by ID', () => {
    const dummyProduct: Product = { _id: '1', id: 1, name: 'Product 1', description: 'product1', price: 100, discount: 10 };

    service.getProductById('1').subscribe(product => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should handle error correctly', () => {
    const errorMessage = 'mock 404 error occurred';

    service.getAllProducts().subscribe(
      () => fail('expected an error, not products'),
      error => expect(error.message).toContain('Something went wrong; please try again later.')
    );

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
