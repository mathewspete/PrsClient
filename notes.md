$ ng new angular-routing --routing
$ start ng serve -o


src > app > app.module.ts imports: FormsModule, HttpClientModule



$ ng g cl user/user
$ ng g s user/user 
$ ng g s system    ///////////////////

$ ng g c about
$ ng g c help
$ ng g c home
$ ng g c menu

$ ng g c user/user-create
$ ng g c user/user-delete
$ ng g c user/user-detail
$ ng g c user/user-edit
$ ng g c user/user-list --skip-test
$ ng g c user/user-login
$ ng g pipe bool-display --module
$ ng g pipe search-user --module

define user class in file app> user > user.ts (user.class.ts)

make edits in app> user > user.service.ts



https://auth0.com/docs/quickstart/spa/angular
npm install @auth0/auth0-angular
import { AuthModule } from '@auth0/auth0-angular';

