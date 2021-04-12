import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/create/create.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { ProductEditComponent } from './product/edit/edit.component';
import { ProductListComponent } from './product/list/list.component';
import { RequestCreateComponent } from './request/create/create.component';
import { RequestDetailComponent } from './request/detail/detail.component';
import { RequestEditComponent } from './request/edit/edit.component';
import { RequestLineComponent } from './request/line/line.component';
import { RequestListComponent } from './request/list/list.component';
import { RequestReviewComponent } from './request/review/review.component';
import { RequestlineCreateComponent } from './requestline/create/create.component';
import { RequestlineEditComponent } from './requestline/edit/edit.component';
import { RequestlineListComponent } from './requestline/list/list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { VendorCreateComponent } from './vendor/create/create.component';
import { VendorDetailComponent } from './vendor/detail/detail.component';
import { VendorEditComponent } from './vendor/edit/edit.component';
import { VendorListComponent } from './vendor/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'PRS: Home' } },
  { path: 'about', component: AboutComponent, data: { title: 'PRS: About' } },
  { path: 'help', component: HelpComponent, data: { title: 'PRS: Help' } },

  { path: 'login', component: UserLoginComponent, data: { title: 'PRS: Login' } },
  { path: 'user/detail/:id', component: UserDetailComponent, data: { title: 'PRS: User List' } },
  { path: 'user/create', component: UserCreateComponent, data: { title: 'PRS: New User' } },
  { path: 'user/edit/:id', component: UserEditComponent, data: { title: 'PRS: Edit User' } },
  { path: 'user/list', component: UserListComponent, data: { title: 'PRS: User List' } },
  { path: 'vendor/detail/:id', component: VendorDetailComponent, data: { title: 'PRS: Vendor Info' } },
  { path: 'vendor/create', component: VendorCreateComponent, data: { title: 'PRS: Vendor' } },
  { path: 'vendor/edit/:id', component: VendorEditComponent, data: { title: 'PRS: Edit Vendor' } },
  { path: 'vendor/list', component: VendorListComponent, data: { title: 'PRS: Vendor List' } },
  { path: 'product/detail/:id', component: ProductDetailComponent, data: { title: 'PRS: Product Info' } },
  { path: 'product/create', component: ProductCreateComponent, data: { title: 'PRS: Product' } },
  { path: 'product/edit/:id', component: ProductEditComponent, data: { title: 'PRS: Product' } },
  { path: 'product/list', component: ProductListComponent, data: { title: 'PRS: Product List' } },
  { path: 'request/detail/:id', component: RequestDetailComponent, data: { title: 'PRS: Request Info' } },
  { path: 'request/create', component: RequestCreateComponent, data: { title: 'PRS: Request' } },
  { path: 'request/edit/:id', component: RequestEditComponent, data: { title: 'PRS: Edit Request' } },
  { path: 'request/line/:id', component: RequestLineComponent, data: { title: 'PRS: Requested Items' } },
  { path: 'request/list', component: RequestListComponent, data: { title: 'PRS: Request List' } },
  { path: 'request/review', component: RequestReviewComponent, data: { title: 'PRS: Pending Request' } },
  { path: 'requestline/create/:rid', component: RequestlineCreateComponent, data: { title: 'PRS: Requestline' } },
  { path: 'requestline/edit/:id', component: RequestlineEditComponent, data: { title: 'PRS: Edit Requestline' } },
  { path: 'requestline/list', component: RequestlineListComponent, data: { title: 'PRS: Requestline' } },



  { path: '**', component: HomeComponent, data: { title: 'PRS: Home' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Know the purpose and use of the _app.module.ts_ and _app-routing.module.ts_

Know what is required to add components to the app.module.ts

Know the proper way to generate components, the syntax and how they use services

Know the unique features of services and why they are used to make the calls to the back-end

Know the decorator names of the component, service, and pipe

Know the directives *ngIf, *ngFor, *ngSwitch, one-way binding and two-way binding and how to use each one

Know the purpose and the use of _pipes_

Know how to define an route in the app-routing.module.ts

Know the main purpose of the constructor in components.

Know how a component gets access to a service.

Know the syntax and differences between one-way and two-way binding.
*/