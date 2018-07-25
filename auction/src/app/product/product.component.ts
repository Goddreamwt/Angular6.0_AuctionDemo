import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products:Array<Product>;

  private imgUrl = 'http://placehold.it/320x150';

  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1,'第一个商品',1.99,3.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","硬件设备","其他"]),
      new Product(2,'第二个商品',2.99,2.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["硬件设备","其他"]),
      new Product(3,'第三个商品',3.99,1.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","硬件设备"]),
      new Product(4,'第四个商品',4.99,2.0,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","其他"]),
      new Product(5,'第五个商品',5.99,3.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","硬件设备","其他"]),
      new Product(6,'第六个商品',6.99,4.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","硬件设备","其他"])
    ];
    this.products.push(new Product(7,'第七个商品',6.99,4.5,"这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的",["电子产品","硬件设备","其他"]));
  }

}

export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){

  }
}
