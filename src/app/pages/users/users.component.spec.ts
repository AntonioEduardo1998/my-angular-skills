import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDeleteDialogComponent } from '@src/app/components/dialogs/user-delete-dialog';
import User from '@src/app/models/User';
import { UsersComponent } from '@src/app/pages/users/users.component';
import { SharedModule } from '@src/app/shared/shared.module';

@Component({
  selector: 'mas-route-mock',
  template: '<h1>Route Mock</h1>',
})
export class RouteMockComponent { }

describe('UsersComponent', () => {
  let component: UsersComponent;
  let router: Router;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent, RouteMockComponent, UserDeleteDialogComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'user-create', component: RouteMockComponent },
          { path: 'user-create/:id', component: RouteMockComponent },
        ]),
      ],
    })
      .overrideModule(BrowserModule, {
        set: {
          entryComponents: [UserDeleteDialogComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call debounceSubject when like method was called', () => {
    jest.spyOn(component.debounceSubject, 'next');
    component.like('someId');
    expect(component.debounceSubject.next).toHaveBeenCalled();
  });

  it('should return favorite when user has liked', () => {
    const user: User = {
      id: 'someId',
      liked: true,
      name: 'John Doe',
      email: 'john@doe.com',
      birthday: new Date(),
    };

    component.users = [user];

    const result = component.getLikedValue(user.id);

    expect(result).toBe('favorite');
  });

  it('should return favorite_border when user has not liked', () => {
    const user: User = {
      id: 'someId',
      liked: false,
      name: 'John Doe',
      email: 'john@doe.com',
      birthday: new Date(),
    };

    component.users = [user];

    const result = component.getLikedValue(user.id);

    expect(result).toBe('favorite_border');
  });

  it('should navigate to user-create page without userId', () => {
    jest.spyOn(router, 'navigate');
    component.navigateToUserConfig();
    expect(router.navigate).toHaveBeenCalledWith(['/user-create']);
  });

  it('should navigate to user-create page with userId', () => {
    jest.spyOn(router, 'navigate');
    component.navigateToUserConfig('someId');
    expect(router.navigate).toHaveBeenCalledWith(['/user-create', 'someId']);
  });

  it('should delete user by id', () => {
    jest.spyOn(component, 'openSnackBar');
    const user: User = {
      id: 'someId',
      liked: false,
      name: 'John Doe',
      email: 'john@doe.com',
      birthday: new Date(),
    };

    component.users = [user];
    localStorage.setItem('@users', JSON.stringify(component.users));

    component.deleteUserById(user.id);
    const userExist = component.users.find((u) => u.id === user.id);
    expect(userExist).toBeUndefined();
    expect(component.openSnackBar).toHaveBeenCalled();
  });

  it('should open a dialog box when openDialog method has been called', () => {
    jest.spyOn(component, 'openDialog');
    component.openDialog('someId');
    expect(component.openDialog).toHaveBeenCalled();
  });
});
