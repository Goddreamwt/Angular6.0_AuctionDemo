import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient,HttpParams} from "@angular/common/http";
import 'rxjs/Rx';

@Injectable({
    providedIn:'root'
})
export class ProductService {

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
        // const params = new HttpParams()
            // .set('id', id+"/comments");
        return this.http.get("/api/product/"+id+"/comments");
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