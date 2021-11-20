import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserCreationComponent } from '@src/app/components/user-creation/user-creation.component';
import User from '@src/app/models/User';
import { UserCreateComponent } from '@src/app/pages/user-create/user-create.component';
import { SharedModule } from '@src/app/shared/shared.module';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateComponent, UserCreationComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user by param id', () => {
    route.snapshot.params = { id: 'someId' };
    const user: User = {
      id: 'someId',
      liked: true,
      name: 'Eduardo',
      email: 'john@doe.com',
      birthday: new Date(),
    };
    const users = [user];
    localStorage.setItem('@users', JSON.stringify(users));

    component.ngOnInit();
    expect(component.user.id).toEqual(component.userId);
  });

  it('should back to users list when backToList was called', () => {
    jest.spyOn(router, 'navigate');
    component.backToList();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should update user if he already exists', () => {
    const user: User = {
      id: 'someId',
      liked: true,
      name: 'Eduardo',
      email: 'john@doe.com',
      birthday: new Date(),
    };
    const users = [user];
    localStorage.setItem('@users', JSON.stringify(users));
    component.saveUser(user);
  });

  it('should save user if he does not already exist', () => {
    localStorage.removeItem('@users');
    const user: User = {
      id: 'someId',
      liked: true,
      name: 'Eduardo',
      email: 'john@doe.com',
      birthday: new Date(),
    };
    component.saveUser(user);
  });
});
