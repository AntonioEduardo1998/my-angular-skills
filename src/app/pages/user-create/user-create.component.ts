import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  public user: User;
  public loading = false;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userId && this.getUserById(this.userId);
  }

  private getUserById(id: string): void {
    this.user = this.userService.getUserById(id)
  }

  public saveUser(user: User): void {
    let users: User[] = JSON.parse(localStorage.getItem('@users'));
    const userExist = users.findIndex(u => u.id === user.id);
    if (!userExist) {
      users[userExist] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('@users', JSON.stringify(users));
    this.router.navigate(['']).then(() => {
      this.openSnackBar('User saved successfully!', 'close');
    });
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
