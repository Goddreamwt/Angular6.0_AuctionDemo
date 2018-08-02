import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {SearchComponent} from './search/search.component';
import {CarouselComponent} from './carousel/carousel.component';
import {ProductComponent} from './product/product.component';
import {StarsComponent} from './stars/stars.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductService} from "./shared/product.service";
import { FilterPipe } from './pipe/filter.pipe';
import { WebSocketComponent } from './web-socket/web-socket.component';
import {WebSocketService} from "./shared/web-socket.service";
import {HttpClientModule} from '@angular/common/http';

const routeConfig: Routes = [
    {path: '', component: HomeComponent},
    {path: 'product/:productId', component: ProductDetailComponent}
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
        HomeComponent,
        FilterPipe,
        WebSocketComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routeConfig),
        ReactiveFormsModule,
        HttpClientModule
    ],

    providers: [ProductService,WebSocketService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
