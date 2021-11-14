import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationComponent } from '@src/app/components/user-creation/user-creation.component';
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
});
