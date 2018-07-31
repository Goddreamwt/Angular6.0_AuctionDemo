# Angular4.0_AuctionDemo
[目录](#1)  
&nbsp; &nbsp; [ 开发准备](#1.1)  
&nbsp; &nbsp;  [ 组件](#1.2)  
&nbsp; &nbsp; [ 模块](#1.3)  

开发准备
-
1.百度Node.js下载并安装

2.检查npm版本
> npm -v

3.安装angular/cli

> sudo npm install -g @angular/cli

4.检查版本

> ng -v

5.在当前目录下创建angular项目

> ng new auction

6.使用WebStrom打开项目


组件
--

例如项目创建初始的app.component.ts文件

```
import { Component } from '@angular/core';

// 装饰器
@Component({
// 源数据
selector: 'app-root',
templateUrl: './app.component.html',//模板
styleUrls: ['./app.component.css']
})

// 控制器
export class AppComponent {
title = 'app';
}

```

模块
--
例如项目创建初始的app.module.ts文件


```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpMethod} from "blocking-proxy/built/lib/webdriver_commands";

//模块
@NgModule({
//模块中有的东西，只能声明组件，指令和管道
declarations: [
AppComponent
],
//要让应用正常运转依赖的其他模块
imports: [
BrowserModule, //浏览器模块
FormsModule,   //表单模块
HttpMethod,    //网络请求模块
],
//声明模块中提供了什么服务，只能声明服务
providers: [],
bootstrap: [AppComponent], //声明模块的主组件
})
export class AppModule { }

```

路由实战思路
-
一.创建商品详情组件，显示商品的图片和标题
使用Angular命令行工具生成一个新的组件
> ng g component productDetail

product-detail.component.ts
```
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
selector: 'app-product-detail',
templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

productTitle:string;

constructor(private routeInfo:ActivatedRoute) { }

ngOnInit() {
this.productTitle = this.routeInfo.snapshot.params["productTitle"];
}

}
```
product-detail.component.html

```
<div>
<img src="http://placehold.it/820x230">
<h4>{{productTitle}}</h4>
</div>
```

二. 重构代码，把轮播图组件和商品列表组件封装进新的Home组件

> ng g component home

把轮播图组件和商品列表组件封装进新的Home组件
home.component.html

```
<div class="row carousel-container">
<app-carousel></app-carousel>
</div>
<div class="row">
<app-product></app-product>
</div>

```
home.component.css

```
.carousel-container{
margin-bottom: 40px;
}

```

三. 配置路由，在导航到商品详情组件时传递商品的标题参数
app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";

const routeConfig:Routes = [
{path:'',component:HomeComponent},
{path:'product/:productTitle',component:ProductDetailComponent}
]

@NgModule({
declarations: [
AppComponent,
NavbarComponent,
FooterComponent,
SearchComponent,
CarouselComponent,
ProductComponent,
StarsComponent,
ProductDetailComponent,
HomeComponent
],
imports: [
BrowserModule,
FormsModule,
RouterModule.forRoot(routeConfig)
],

providers: [],
bootstrap: [AppComponent],
})
export class AppModule { }

```
因为我们没有引入route组件，所以需要手动写`routeConfig`，然后在imports中引入主模块`RouterModule.forRoot(routeConfig)`，只有在主模块时才用forRoot，如果是子模块则使用forChild

四.修改App组件，根据路由显示Home组件或商品详情组件
app.component.html

```
<app-navbar></app-navbar>
<div class="container">
<div class="row">
<div class="col-md-3">
<app-search></app-search>
</div>
<div class="col-md-9">
<router-outlet></router-outlet>
</div>
</div>
</div>
<app-footer></app-footer>

```
把原来轮播组件和商品详情组件替换成路由插座

五. 修改商品列表组件，给商品标题添加带routeLink指令的链接，导航到商品详情路由

product.component.html

```
<div *ngFor="let product of products" class="col-md-4 col-sm-4 col-lg-4">
<div class="thumbnail">
<!--//属性绑定-->
<img [src]="imgUrl">
<div class="caption">
<h4 class="pull-right">{{product.price}}元</h4>
<h4><a [routerLink]="['/product',product.title]">{{product.title}}</a></h4>
<p>{{product.desc}}</p>
</div>
<div>
<app-stars [rating]="product.rating"></app-stars>
</div>
</div>
</div>

```
点击第一个商品跳转到商品详情页

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180725-144528.png)


![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180725-144550.png)

[gitHub参考代码](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/77808533f15ba30367bb20f983d408ca1ed08576)

重构Auction依赖注入步骤
-----------

- 编写ProductService.包含3个方法：getProducts(),getProducts(id)以及getCommentsForProduct(id)

>  ng g service shared/product


product.service.ts

```
import {Injectable} from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class ProductService {

private products: Product[] = [
new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"]),
new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["硬件设备", "其他"]),
new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备"]),
new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "其他"]),
new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"]),
new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"])
];

private comments:Comment[] = [
new Comment(1,1,"2017-02-02 22:22:22","张三",3,"东西不错"),
new Comment(2,1,"2017-03-02 23:22:22","李四",4,"东西挺不错"),
new Comment(3,1,"2017-04-02 24:22:22","王五",2,"东西不错"),
new Comment(4,1,"2017-05-02 25:22:22","赵六",1,"东西还不错"),
new Comment(5,1,"2017-06-02 26:22:22","哈哈",3,"东西不错"),
]
constructor() {
}

getProducts():Product[] {
return this.products;
}

getProduct(id:number):Product{
return this.products.find((product) => product.id == id);
}

getCommentsForProductId(id:number):Comment[]{
return this.comments.filter((comment:Comment) => comment.productId == id);
}
}


export class Product {
constructor(public id: number,
public title: string,
public price: number,
public rating: number,
public desc: string,
public categories: Array<string>) {

}
}

export class Comment{
constructor(public  id:number,
public productId:number,
public timestamp:string,
public user:string,
public rating:number,
public content:string
){

}
}
```

- 修改路由配置。在从商品列表进入商品详情时，不再传递商品名称，改为传递商品ID。

修改app.module.ts

原来传的是productTitle，修改为productId
```
const routeConfig:Routes = [
{path:'',component:HomeComponent},
{path:'product/:productId',component:ProductDetailComponent}
]
```

修改product.component.html，也改为id

```
<div *ngFor="let product of products" class="col-md-4 col-sm-4 col-lg-4">
<div class="thumbnail">
<!--//属性绑定-->
<img [src]="imgUrl">
<div class="caption">
<h4 class="pull-right">{{product.price}}元</h4>
<h4><a [routerLink]="['/product',product.id]">{{product.title}}</a></h4>
<p>{{product.desc}}</p>
</div>
<div>
<app-stars [rating]="product.rating"></app-stars>
</div>
</div>
</div>

```

product-detail.component.ts

```
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../shared/product.service";

@Component({
selector: 'app-product-detail',
templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

product:Product;

constructor(private routeInfo:ActivatedRoute) { }

ngOnInit() {
let productId:number = this.routeInfo.snapshot.params["productId"];
}

}

```

- 注入ProductService并使用其服务。

首先在app.module.ts中的`providers: [ProductService],`来声明这个服务。
然后在product.component.ts中注入`ProductService`，并通过`ProductService`来获取`Products`

```
import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";

@Component({
selector: 'app-product',
templateUrl: './product.component.html',
styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

private products:Product[];

private imgUrl = 'http://placehold.it/320x150';

constructor(private productService:ProductService) { }

ngOnInit() {

this.products = this.productService.getProducts();
}

}

```

product-detail.component.ts

```
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService} from "../shared/product.service";

@Component({
selector: 'app-product-detail',
templateUrl: './product-detail.component.html',
styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

product:Product;

constructor(private routeInfo:ActivatedRoute,
private productService:ProductService
) { }

ngOnInit() {
let productId:number = this.routeInfo.snapshot.params["productId"];

this.product = this.productService.getProduct(productId);
}

}
```

product-detail.component.html

```
<div class="thumbnail">
<img src="http://placehold.it/820x230">
<div>
<h4 class="pull-right">{{product.price}}元</h4>
<h4>{{product.title}}</h4>
<p>{{product.desc}}</p>
</div>

</div>
```
完成了商品详情跳转及展示，接下来处理商品评论

product-detail.component.ts

```
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

constructor(private routeInfo: ActivatedRoute,
private productService: ProductService) {
}

ngOnInit() {
let productId: number = this.routeInfo.snapshot.params["productId"];

this.product = this.productService.getProduct(productId);
this.comments = this.productService.getCommentsForProductId(productId);
}

}

```
product-detail.component.html

```
<div class="thumbnail">
<img src="http://placehold.it/820x230">
<div>
<h4 class="pull-right">{{product.price}}元</h4>
<h4>{{product.title}}</h4>
<p>{{product.desc}}</p>
</div>

<div>
<p class="pull-right">评论：{{comments.length}}</p>
<p>
<app-stars [rating]="product.rating"></app-stars>
</p>
</div>
</div>

<div class="well">
<div class="row" *ngFor="let comment of comments">
<hr>
<div class="col-md-12">
<app-stars [rating]="comment.rating"></app-stars>
<span>{{comment.user}}</span>
<span class="pull-right">{{comment.timestamp}}</span>
<p></p>
<p>{{comment.content}}</p>
</div>
</div>
</div>
```

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180726-110430.png)

[gitHub参考代码](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/230a263f3dc1e5a41dd0a77a2b61d17185902cd9)


商品搜索功能
--
1.首先在product中添加搜索栏

product.component.html

```
<div class="row">
<div class="col-sm-12">
<div class="form-group">
<input class="form-control" placeholder="请输入商品名称" [formControl] ="titleFilter">
</div>
</div>
</div>
<div *ngFor="let product of products" class="col-md-4 col-sm-4 col-lg-4">
<div class="thumbnail">
<!--//属性绑定-->
<img [src]="imgUrl">
<div class="caption">
<h4 class="pull-right">{{product.price}}元</h4>
<h4><a [routerLink]="['/product',product.id]">{{product.title}}</a></h4>
<p>{{product.desc}}</p>
</div>
<div>
<app-stars [rating]="product.rating"></app-stars>
</div>
</div>
</div>

```

2.在app.module.ts的`imports`引入`ReactiveFormsModule`模块

3.product.component.ts

```
import {Component, OnInit} from '@angular/core';
import {ProductService, Product} from "../shared/product.service";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';

@Component({
selector: 'app-product',
templateUrl: './product.component.html',
styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

private products: Product[];
private keyword: string;
private titleFilter:FormControl = new FormControl();
private imgUrl = 'http://placehold.it/320x150';

constructor(private productService: ProductService) {
this.titleFilter.valueChanges
.debounceTime(500)
.subscribe(
value => this.keyword = value
);
}

ngOnInit() {

this.products = this.productService.getProducts();

}

}
```

`.debounceTime(500)` 的意思是当用户输入500毫秒以后才把用户的输入结果发送到`subscribe`观察者当中
注意引入`import 'rxjs/Rx';`才能起作用
升级到Angular6以后，需要

> cd 项目根目录
> npm install --save rxjs-compat

否则报错。`debounceTime`是为了优化用户体验，防止页面抖动用的。属于rxjs响应式编程。

4.创建管道

> ng g pipe pipe/filter

filter.pipe.ts

```
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
name: 'filter'
})
export class FilterPipe implements PipeTransform {

transform(list: any[], filterField: string, keyword: string): any {
if (!filterField || !keyword) {
return list;
}
return list.filter( item =>{
let fiedlValue = item[filterField];
return  fiedlValue.indexOf(keyword) >= 0;
});
}
}

```

5.product.component.html

```
<div class="row">
<div class="col-sm-12">
<div class="form-group">
<input class="form-control" placeholder="请输入商品名称"
[formControl] ="titleFilter"
>
</div>
</div>
</div>
<div *ngFor="let product of products | filter:'title':keyword "  class="col-md-4 col-sm-4 col-lg-4">
<div class="thumbnail">
<!--//属性绑定-->
<img [src]="imgUrl">
<div class="caption">
<h4 class="pull-right">{{product.price}}元</h4>
<h4><a [routerLink]="['/product',product.id]">{{product.title}}</a></h4>
<p>{{product.desc}}</p>
</div>
<div>
<app-stars [rating]="product.rating"></app-stars>
</div>
</div>
</div>

```

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/1.png)

[gitHub参考代码链接](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/547ff358379a1d86fdd2068ac45fb9ca37a032e1)


添加评论功能(组件间通讯)
---
实现点击星级评价组件,首先先给星级评价组件添加点击状态。

stars.component.html

```
<p>
<span  *ngFor="let star of stars; let i=index;" class="glyphicon glyphicon-star"
[class.glyphicon-star-empty]="star" (click)="clickStar(i)" ></span>
<span>{{rating}}星</span>
</p>

```

点击星级评价组件，修改星星值的状态
stars.component.ts

```
import {Component, OnInit, Input} from '@angular/core';
// import {start} from "repl";

@Component({
selector: 'app-stars',
templateUrl: './stars.component.html',
styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

@Input()
private rating: number = 0;

private stars: boolean[];

@Input()
private readonly:boolean = true;

constructor() {
}

ngOnInit() {
this.stars = [];
for (let i = 1; i <= 5; i++) {
this.stars.push(i > this.rating);
}
}

clickStar(index: number) {
if (!this.readonly){
this.rating = index + 1;
this.ngOnInit();
}
}

}

```
新建两个属性用来保存新的评价状态newRating，newComment
product-detail.component.ts

```
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

constructor(private routeInfo: ActivatedRoute,
private productService: ProductService) {
}

ngOnInit() {
let productId: number = this.routeInfo.snapshot.params["productId"];

this.product = this.productService.getProduct(productId);
this.comments = this.productService.getCommentsForProductId(productId);
}
}

```

product-detail.component.html

```
<div class="thumbnail">
<img src="http://placehold.it/820x230">
<div>
<h4 class="pull-right">{{product.price}}元</h4>
<h4>{{product.title}}</h4>
<p>{{product.desc}}</p>
</div>

<div>
<p class="pull-right">评论：{{comments.length}}</p>
<p>
<app-stars [rating]="product.rating"></app-stars>
</p>
</div>
</div>

<div class="well">
<div>
<div><app-stars [rating]="newRating" [readonly]="false"></app-stars></div>
<div>
<textarea [(ngModel)]="newComment"></textarea>
</div>
<div>
<button class="btn" (click)="addComment()">提交</button>
</div>
</div>

<div class="row" *ngFor="let comment of comments">
<hr>
<div class="col-md-12">
<app-stars [rating]="comment.rating"></app-stars>
<span>{{comment.user}}</span>
<span class="pull-right">{{comment.timestamp}}</span>
<p></p>
<p>{{comment.content}}</p>
</div>
</div>
</div>
```

product-detail.component.ts

```
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
}
}

```

发现问题：选择的是2星，但是出现的确是5星，是因为星星组件没有进行双向绑定设置。

stars.component.ts 添加输出属性

```
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
// import {start} from "repl";

@Component({
selector: 'app-stars',
templateUrl: './stars.component.html',
styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

@Input()
private rating: number = 0;

@Output()
private ratingChange:EventEmitter<number> = new EventEmitter();

private stars: boolean[];

@Input()
private readonly:boolean = true;

constructor() {
}

ngOnInit() {
this.stars = [];
for (let i = 1; i <= 5; i++) {
this.stars.push(i > this.rating);
}
}

clickStar(index: number) {
if (!this.readonly){
this.rating = index + 1;
this.ngOnInit();
this.ratingChange.emit(this.rating);
}
}

}

```
product-detail.component.html 修改为双向绑定

```
<div class="thumbnail">
<img src="http://placehold.it/820x230">
<div>
<h4 class="pull-right">{{product.price}}元</h4>
<h4>{{product.title}}</h4>
<p>{{product.desc}}</p>
</div>

<div>
<p class="pull-right">评论：{{comments.length}}</p>
<p>
<app-stars [rating]="product.rating"></app-stars>
</p>
</div>
</div>

<div class="well">
<div>
<div><app-stars [(rating)]="newRating" [readonly]="false"></app-stars></div>
<div>
<textarea [(ngModel)]="newComment"></textarea>
</div>
<div>
<button class="btn" (click)="addComment()">提交</button>
</div>
</div>

<div class="row" *ngFor="let comment of comments">
<hr>
<div class="col-md-12">
<app-stars [rating]="comment.rating"></app-stars>
<span>{{comment.user}}</span>
<span class="pull-right">{{comment.timestamp}}</span>
<p></p>
<p>{{comment.content}}</p>
</div>
</div>
</div>
```

注意：只有当输入属性`@Input()  private rating: number = 0;` 和输出属性`@Output() private ratingChange:EventEmitter<number> = new EventEmitter();` 符合`rating` + `Change` = `ratingChange` 时，才可以使用`[(rating)]="newRating"`这种方式来写，不然就需要写一个`ratingChange`的输出事件。

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/12.png)


接下来，我们设置是否显示评价功能区域

product-detail.component.ts

```
isCommentHidden = true;

```

product-detail.component.html
```
<div class="well">
<div>
<button class="btn btn-success" (click)="isCommentHidden = !isCommentHidden">发表评论</button>
</div>
<div [hidden] = "isCommentHidden">
<div><app-stars [(rating)]="newRating" [readonly]="false"></app-stars></div>
<div>
<textarea [(ngModel)]="newComment"></textarea>
</div>
<div>
<button class="btn" (click)="addComment()">提交</button>
</div>
</div>

<div class="row" *ngFor="let comment of comments">
<hr>
<div class="col-md-12">
<app-stars [rating]="comment.rating"></app-stars>
<span>{{comment.user}}</span>
<span class="pull-right">{{comment.timestamp}}</span>
<p></p>
<p>{{comment.content}}</p>
</div>
</div>
</div>
```

完成。

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180731-150737.png)

product-detail.component.ts

```
addComment(){
let comment = new Comment(0,this.product.id,new Date().toISOString(),"someone",this.newRating,this.newComment);
this.comments.unshift(comment);

this.newComment =null;
this.newRating = 5;
this.isCommentHidden = true;
}
```

stars.component.ts 使用`ngOnChanges`改变星级初始状态

```
import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
// import {start} from "repl";

@Component({
selector: 'app-stars',
templateUrl: './stars.component.html',
styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {

@Input()
private rating: number = 0;

@Output()
private ratingChange: EventEmitter<number> = new EventEmitter();

private stars: boolean[];

@Input()
private readonly: boolean = true;

constructor() {
}

ngOnInit() {

}

ngOnChanges(changes: SimpleChanges): void {
this.stars = [];
for (let i = 1; i <= 5; i++) {
this.stars.push(i > this.rating);
}
}

clickStar(index: number) {
if (!this.readonly) {
this.rating = index + 1;
this.ratingChange.emit(this.rating);
}
}

}

```

让商品详情根据我们新的评星，计算整个的星级平均值

product-detail.component.ts

- reduce方法需要两个参数(sum,comment) => sum + comment.rating 匿名回调，0 代表初始值
- 循环comments数组中的所有元素，当第一次循环的时候sum=0，comment是数组中的第一个元素。sum
+comment.rating作为返回值，作为下一次循环时的sum

```
addComment(){
let comment = new Comment(0,this.product.id,new Date().toISOString(),"someone",this.newRating,this.newComment);
this.comments.unshift(comment);

let sum = this.comments.reduce((sum,comment) => sum + comment.rating,0);
this.product.rating =sum / this.comments.length;

this.newComment =null;
this.newRating = 5;
this.isCommentHidden = true;
}
```

使用管道进行星级数值规则初始化
stars.component.html

```
<p>
<span  *ngFor="let star of stars; let i=index;" class="glyphicon glyphicon-star"
[class.glyphicon-star-empty]="star" (click)="clickStar(i)" ></span>
<span>{{rating | number:'1.0-2'}}星</span>
</p>

```

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180731-153843.png)

[GitHub参考代码](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/908edaf9674b889a9785f8015a9b26e5ce543a9d)

完善搜索功能(表单处理)
------
在商品名称和商品价格以及商品类别都输入或者选择合法的情况下才能进行搜索。

一.product.service.ts添加一个新的方法，获取所有商品类别

```
getAllCategories():string[]{
return ["电子产品", "硬件设备", "其他"];
}
```

二.使用响应式表单实现效果，所以建一个表单的数据模型
search.component.ts

```
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ProductService} from "../shared/product.service";

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

formModel: FormGroup;

categories:string[];

constructor(private productService:ProductService) {
let fb = new FormBuilder();
this.formModel = fb.group({
title: ['', Validators.minLength(3)],
price: [null,this.positiveNumberValidator],
category: ['-1']
});
}

ngOnInit() {
this.categories =this.productService.getAllCategories();
}

positiveNumberValidator(control: FormControl): any {
if (!control.value) {
return null;
}
let price = parseInt(control.value);

if (price > 0) {
return null;
}else {
return {positiveNumber:true};
}
}

onSearch(){
if (this.formModel.valid){
console.log(this.formModel.value);
}
}
}

```

三.把数据模型与HTML元素链接
search.component.html

```
<form [formGroup]="formModel" (ngSubmit)="onSearch()" novalidate>
<!--novalidate:禁用浏览器验证的默认行为-->
<div class="form-group" [class.has-error]="formModel.hasError('minlength','title')">
<label for="productTitle">商品名称</label>
<input formControlName="title" type="text" id="productTitle" placeholder="商品名称" class="form-control">
<span class="help-block" [class.hidden]="!formModel.hasError('minlength','title')">
请至少输入3个字
</span>
</div>

<div class="form-group" [class.has-error]="formModel.hasError('positiveNumber','price')">
<label for="productPrice">商品价格</label>
<input formControlName="price" type="number" id="productPrice" placeholder="商品价格" class="form-control">
<span class="help-block" [class.hidden]="!formModel.hasError('positiveNumber','price')">
请输入正数
</span>
</div>

<div class="form-group">
<label for="productCategory">商品类别</label>
<select formControlName="category" id="productCategory" class="form-control">
<option value="-1">全部分类</option>
<option *ngFor="let category of categories" [value]="category">{{category}}</option>
</select>
</div>

<div class="form-group">
<button type="submit" class="btn btn-primary btn-block">搜索</button>
</div>
</form>

```

最终效果：

![image](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/blob/master/image/QQ20180731-180939.png)

[gitHub参考代码](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/b1297fc715999155cb8acb489e391493e8576de6?diff=unified)

