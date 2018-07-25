import { Component } from '@angular/core';

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
}
