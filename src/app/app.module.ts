import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
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

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserDeleteComponent,
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
    SearchProductPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
