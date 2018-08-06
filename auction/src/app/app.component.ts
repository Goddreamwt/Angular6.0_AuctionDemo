import { Component } from '@angular/core';
import {environment} from "../environments/environment";

// 装饰器
@Component({
  // 源数据
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// 控制器
export class AppComponent {
  title = 'angular学习，哈哈哈哈';

    constructor(){
        console.log("微信号是"+environment.weixinNumber);
    }
}
