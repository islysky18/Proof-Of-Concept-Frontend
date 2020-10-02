import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // Race condition: HTML template file is attemptiong to access property: productimageUrl but product is not assigned yet hence create error.

  // 2 Solutions:
  // 1: create new instance of the product
  // 2: {{product?.imageUrl}} -> safe-navigate operator
  // property have to instantiate
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the "id" param string. convert string to a number uing the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    // Propert is not assigned a value until data arrives from the ProductService method call, Async call
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
  addToCart() {
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`
    );
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
