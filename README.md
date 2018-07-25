# Angular4.0_AuctionDemo

路由实战思路

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
![这里写图片描述](https://img-blog.csdn.net/201807251434001?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![这里写图片描述](https://img-blog.csdn.net/20180725143436194?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

[gitHub参考代码](https://github.com/Goddreamwt/Angular4.0_AuctionDemo/commit/77808533f15ba30367bb20f983d408ca1ed08576)

