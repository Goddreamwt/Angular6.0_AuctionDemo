 //核心模块提供的enableProdMode用来，用来关闭angular的开发者模式
import { enableProdMode } from '@angular/core';
//使用哪个模块来启动应用
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//命令行工具生成的主模块
import { AppModule } from './app/app.module';
//环境配置
import { environment } from './environments/environment';

//如果是生产模式，就关闭angular的开发者模式
if (environment.production) {
  enableProdMode();
}

//传入AppModule模块来启动应用，应用的起点
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
