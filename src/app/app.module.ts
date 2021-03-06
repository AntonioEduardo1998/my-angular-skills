import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { UserDeleteDialogComponent } from 'src/app/components/dialogs/user-delete-dialog';
import { UserCreationComponent } from 'src/app/components/user-creation/user-creation.component';
import { UserCreateComponent } from 'src/app/pages/user-create/user-create.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserCreateComponent,
    UserCreationComponent,
    UserDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
