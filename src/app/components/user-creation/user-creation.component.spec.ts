import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationComponent } from '@src/app/components/user-creation/user-creation.component';
import User from '@src/app/models/User';
import { SharedModule } from '@src/app/shared/shared.module';

describe('UserCreationComponent', () => {
  let component: UserCreationComponent;
  let fixture: ComponentFixture<UserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreationComponent],
      imports: [
        SharedModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form if user exists', () => {
    jest.spyOn(component.userForm, 'setValue');
    component.user = {
      id: 'someId',
      name: 'someName',
      email: 'someEmail',
      liked: true,
      birthday: new Date('2021-11-20T20:13:53.299Z'),
    } as User;

    component.ngOnInit();
    expect(component.userForm.setValue).toHaveBeenCalledWith({
      name: 'someName',
      email: 'someEmail',
      birthday: new Date('2021-11-20T20:13:53.299Z'),
    });
  });

  it('should create user', () => {
    jest.spyOn(component.userEmitter, 'emit');
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      birthday: new Date('2021-11-20T20:13:53.299Z'),
    } as User;

    component.userForm.setValue(user);
    component.createUser();
    expect(component.userEmitter.emit).toHaveBeenCalled();
  });

  it('should update user', () => {
    jest.spyOn(component.userEmitter, 'emit');
    const user = {
      id: 'someId',
      name: 'John Doe',
      liked: true,
      email: 'johndoe@email.com',
      birthday: new Date('2021-11-20T20:13:53.299Z'),
    } as User;

    component.user = user;
    component.ngOnInit();
    component.createUser();
    expect(component.userEmitter.emit).toHaveBeenCalled();
  });
});
