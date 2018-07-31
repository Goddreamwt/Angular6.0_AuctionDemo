import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService, Comment} from "../shared/product.service";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: Product;

    comments: Comment[];

    newRating:number =5;
    newComment:string = "";

    isCommentHidden = true;

    constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService) {
    }

    ngOnInit() {
        let productId: number = this.routeInfo.snapshot.params["productId"];

        this.product = this.productService.getProduct(productId);
        this.comments = this.productService.getCommentsForProductId(productId);
    }

    addComment(){
        let comment = new Comment(0,this.product.id,new Date().toISOString(),"someone",this.newRating,this.newComment);
        this.comments.unshift(comment);

        //reduce方法需要两个参数(sum,comment) => sum + comment.rating 匿名回调，0 代表初始值
        //循环comments数组中的所有元素，当第一次循环的时候sum=0，comment是数组中的第一个元素。sum + comment.rating作为返回值，作为下一次循环时的sum
        let sum = this.comments.reduce((sum,comment) => sum + comment.rating,0);
        this.product.rating =sum / this.comments.length;

        this.newComment =null;
        this.newRating = 5;
        this.isCommentHidden = true;
    }
}
