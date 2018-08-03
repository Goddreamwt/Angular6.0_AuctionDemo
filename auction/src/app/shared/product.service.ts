import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient,HttpParams} from "@angular/common/http";
import 'rxjs/Rx';
import {URLSearchParams} from "@angular/http";

@Injectable({
    providedIn:'root'
})
export class ProductService {

    // product.service.ts作为product.component.ts和search.component.ts两个组件的中间人，定义搜索组件点击事件的流
    searchEvent:EventEmitter<ProductSearchParams> = new EventEmitter();

    constructor(private http:HttpClient) {
    }

    getAllCategories():string[]{
        return ["电子产品", "硬件设备", "其他"];
    }

    getProducts():any{
        return this.http.get("/api/products");
    }


    getProduct(id: string):any {

        return this.http.get("/api/product/"+id);
    }

    getCommentsForProductId(id: string):any {

        return this.http.get("/api/product/"+id+"/comments");
    }

    search(params:ProductSearchParams):any{
        console.log(params);
        // return this.http.get("/api/products/",{search:this.encodeParams(params)});
        return this.http.get("/api/products?title="+params.title+"&price="+params.price+"&category="+params.category);
    }

    // private encodeParams(params: ProductSearchParams) {
    //     // let result:URLSearchParams;
    //     console.log(params);
    //     console.log(Object.keys(params).filter(key => params[key]));
    //     // result = Object.keys(params)
    //     //     .filter(key => params[key])
    //     //     .reduce((sum:URLSearchParams,key:string) =>{
    //     //         sum.append(key,params[key]);
    //     //         return sum;
    //     //     },new URLSearchParams());
    //     let result:ProductSearchParams;
    //     result =Object.keys(params).filter(key => params[key]);
    //     console.log(result);
    //     return result;
    // }
}

export class  ProductSearchParams{
    constructor(public title:string,
                public price:number,
                public category:string
    ){}
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