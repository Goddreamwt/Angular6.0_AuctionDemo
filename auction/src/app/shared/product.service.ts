import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {

    private products: Product[] = [
        new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"]),
        new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["硬件设备", "其他"]),
        new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备"]),
        new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "其他"]),
        new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"]),
        new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，随便是到手京东卡是你的拉克丝等你拉屎的", ["电子产品", "硬件设备", "其他"])
    ];

    private comments: Comment[] = [
        new Comment(1, 1, "2017-02-02 22:22:22", "张三", 3, "东西不错"),
        new Comment(2, 2, "2017-03-02 23:22:22", "李四", 4, "东西挺不错"),
        new Comment(3, 1, "2017-04-02 24:22:22", "王五", 2, "东西不错"),
        new Comment(4, 1, "2017-05-02 25:22:22", "赵六", 1, "东西还不错"),
        new Comment(5, 1, "2017-06-02 26:22:22", "哈哈", 3, "东西不错"),
    ]

    constructor() {
    }

    getProducts(): Product[] {
        return this.products;
    }

    getProduct(id: number): Product {
        return this.products.find((product) => product.id == id);
    }

    getCommentsForProductId(id: number): Comment[] {
        return this.comments.filter((comment: Comment) => comment.productId == id);
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

export class Comment {
    constructor(public  id: number,
                public productId: number,
                public timestamp: string,
                public user: string,
                public rating: number,
                public content: string) {

    }
}