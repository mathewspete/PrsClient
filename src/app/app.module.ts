import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { BoolDisplayPipe } from './bool-display.pipe';
import { SearchUserPipe } from './search-user.pipe';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { MenuComponent } from './menu/menu.component';
import { VendorCreateComponent } from './vendor/create/create.component';
import { VendorDetailComponent } from './vendor/detail/detail.component';
import { VendorEditComponent } from './vendor/edit/edit.component';
import { VendorListComponent } from './vendor/list/list.component';
import { SearchVendorPipe } from './search-vendor.pipe';
import { ProductCreateComponent } from './product/create/create.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { ProductEditComponent } from './product/edit/edit.component';
import { ProductListComponent } from './product/list/list.component';
import { SearchProductPipe } from './search-product.pipe';
import { RequestCreateComponent } from './request/create/create.component';
import { RequestlineCreateComponent } from './requestline/create/create.component';
import { RequestDetailComponent } from './request/detail/detail.component';
import { RequestlineDetailComponent } from './requestline/detail/detail.component';
import { RequestEditComponent } from './request/edit/edit.component';
import { RequestlineEditComponent } from './requestline/edit/edit.component';
import { RequestListComponent } from './request/list/list.component';
import { RequestlineListComponent } from './requestline/list/list.component';
import { SearchRequestPipe } from './search-request.pipe';
import { SearchRequestlinePipe } from './search-requestline.pipe';
import { RequestLineComponent } from './request/line/line.component';
import { RequestReviewComponent } from './request/review/review.component';
import { RequestComponent } from './requestline/request/request.component';
//import { HeroListPageComponent } from './99-animations/animations/animations.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserCreateComponent,
    UserLoginComponent,
    BoolDisplayPipe,
    SearchUserPipe,
    AboutComponent,
    HomeComponent,
    HelpComponent,
    MenuComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    VendorEditComponent,
    VendorListComponent,
    SearchVendorPipe,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    SearchProductPipe,
    RequestCreateComponent,
    RequestlineCreateComponent,
    RequestDetailComponent,
    RequestlineDetailComponent,
    RequestEditComponent,
    RequestlineEditComponent,
    RequestListComponent,
    RequestlineListComponent,
    SearchRequestPipe,
    SearchRequestlinePipe,
    RequestLineComponent,
    RequestReviewComponent,
    RequestComponent//,
    //HeroListPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
