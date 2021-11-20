import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import User from '@src/app/models/User';
import { getUserById } from '@src/app/utils/util';

@Component({
  selector: 'mas-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  public userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public user: User;

  public loading = false;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.getUserById(this.userId);
    }
  }

  private getUserById(id: string): void {
    this.user = getUserById(id);
  }

  public saveUser(user: User): void {
    const users: User[] = JSON.parse(localStorage.getItem('@users')) || [];
    const userExist = users.findIndex((u) => u.id === user.id);

    if (userExist >= 0) {
      users[userExist] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('@users', JSON.stringify(users));
    this.router.navigate(['']).then(() => {
      this.openSnackBar('User saved successfully!', 'close');
    });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public backToList(): void {
    this.router.navigate(['']);
  }
}
