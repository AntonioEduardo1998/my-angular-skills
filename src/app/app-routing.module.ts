import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreateComponent } from 'src/app/pages/user-create/user-create.component';
import { UsersComponent } from 'src/app/pages/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user-create/:id', component: UserCreateComponent },
  { path: 'user-create', component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
