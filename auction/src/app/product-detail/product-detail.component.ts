import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService, Comment} from "../shared/product.service";
import {WebSocketService} from "../shared/web-socket.service";
import {any} from "codelyzer/util/function";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: Product;

    comments: Comment[];

    newRating: number = 5;
    newComment: string = "";

    isCommentHidden = true;

    isWatched: boolean = false;
    currentBid: number;

    subscription: Subscription;

    constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService,
                private wsService: WebSocketService) {
    }

    ngOnInit() {
        let productId: string = this.routeInfo.snapshot.params["productId"];

        this.productService.getProduct(productId).subscribe(
            product => {
                this.product = product;
                this.currentBid = product.price;
            }
        );
        this.productService.getCommentsForProductId(productId).subscribe(
            coments => this.comments = coments
        );
    }

    addComment() {
        let comment = new Comment(0, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
        this.comments.unshift(comment);

        let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
        this.product.rating = sum / this.comments.length;

        this.newComment = null;
        this.newRating = 5;
        this.isCommentHidden = true;
    }

    watchProduct() {
        var _this = this;
        if (_this.subscription) {
            _this.subscription.unsubscribe();
            _this.isWatched = false;
            _this.subscription = null;
        } else {
            _this.isWatched = true;
            let products: any[];
            _this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
                .subscribe(
                    function (products1) {
                        console.log(JSON.parse(products1));
                        products = JSON.parse(products1);
                        _this.currentBid = products[0].bid
                    }
                );
        }
    }
}
