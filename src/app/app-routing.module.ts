import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/create/create.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { ProductEditComponent } from './product/edit/edit.component';
import { ProductListComponent } from './product/list/list.component';
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
  {path: '',redirectTo: '/', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'help', component: HelpComponent },

  {path: 'login', component: UserLoginComponent},
  {path: 'user/detail/:id', component: UserDetailComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'user/list', component: UserListComponent},
  {path: 'vendor/detail/:id', component: VendorDetailComponent},
  {path: 'vendor/create', component: VendorCreateComponent},
  {path: 'vendor/edit/:id', component: VendorEditComponent},
  {path: 'vendor/list', component: VendorListComponent},
  {path: 'product/detail/:id', component: ProductDetailComponent},
  {path: 'product/create', component: ProductCreateComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product/list', component: ProductListComponent},
  


  {path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
