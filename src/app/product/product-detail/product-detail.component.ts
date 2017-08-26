import { Product, Review, ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  reviews: Review[];

  newComment: string;
  newRating: number;

  isReviewHidden = true;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
  ) {
    const prodId: number = Number(route.snapshot.params['productId']);
    this.product = productService.getProductById(prodId);
    this.reviews = productService.getReviewsForProduct(this.product.id);
  }

  ngOnInit() {
  }

  addReview () {
    const review = new Review(0, this.product.id, new Date(), 'Anonymous',
    this.newRating, this.newComment);
    console.log('Adding review ' + JSON.stringify(review));

    this.reviews = [...this.reviews, review];
    this.product.rating = this.averageRating(this.reviews);

    this.resetForm();
  }

  averageRating (reviews: Review[]) {
    const sum = reviews.reduce((average, review) => average + review.rating, 0);
    return sum / reviews.length;
  }

  resetForm () {
    this.newRating = 0;
    this.newComment = null;
    this.isReviewHidden = true;
  }

}
