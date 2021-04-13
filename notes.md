$ ng new angular-routing --routing
$ start ng serve -o

src > app > app.module.ts imports: FormsModule, HttpClientModule

$ ng g cl user/user
$ ng g s user/user
$ ng g s system ///////////////////

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

    https://ng-bootstrap.github.io/#/components/accordion/examples

    <ng-template #content let-c="close" let-d="dismiss">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">New Item Request</h4>
        <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label for="quantity" class="form-label">Quantity</label>
        <input type="number" id="quantity" class="form-control" aria-describedby="quantity">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="c('Save click')">Save</button>
      </div>
    </ng-template>

    <button class="btn btn-lg btn-outline-primary" (click)="open(content)">Launch demo modal
      <button *ngIf="isAdmin() || isOwner()" (click)="save()" class="btn btn-primary float-right">
            Save
            <span class="material-icons md-18">
              save
            </span>
          </button>
    </button>
