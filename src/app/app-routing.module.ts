import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  {path: '',redirectTo: '/', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'help', component: HelpComponent },

  {path: 'user/list', component: UserListComponent},
  {path: 'user/detail/:id', component: UserDetailComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'login', component: UserLoginComponent},
  


  {path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
