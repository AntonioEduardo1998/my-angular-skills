import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import User from 'src/app/models/User';
import { v4 as uuid4 } from 'uuid';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  public userForm: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      birthday: new FormControl(''),
      email: new FormControl(''),
    }
  );

  @Input() public user: User;
  @Output() public userEmitter = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.setValue({
        name: this.user.name,
        birthday: this.user.birthday,
        email: this.user.email,
      });
    }
  }

  public createUser(): void {
    const newUser = this.userForm.getRawValue();
    if (!this.user?.id) {
      newUser.id = uuid4();
    } else {
      newUser.id = this.user.id;
    }

    this.userEmitter.emit(newUser);
  }

}