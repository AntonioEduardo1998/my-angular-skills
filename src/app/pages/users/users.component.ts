import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public userSubscription: Subscription;

  public loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('@users'));
    if (!this.users?.length) {
      this.setLoading(true);
      this.userSubscription = this.userService.getUsers().subscribe({
        next: (users: User[]) => {
          this.users = users;
          localStorage.setItem('@users', JSON.stringify(users));
        },
        complete: () => {
          this.setLoading(false);
        }
      })
    }
  }

  public navigateToUserConfig(userId?: string): void {
    userId
      ? this.router.navigate(['/user-create', userId])
      : this.router.navigate(['/user-create']);
  }

  public deleteUserById(userId: string): void {
    const users: User[] = JSON.parse(localStorage.getItem('@users'));
    const userIndex = users.findIndex(u => u.id === userId);
    users.splice(userIndex, 1);
    localStorage.setItem('@users', JSON.stringify(users));
    this.users = users;
    this.openSnackBar('User deleted successfully ', 'close');
  }

  public ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public openDialog(userId: string): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.deleteUserById(userId);
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

@Component({
  selector: 'user-delete-dialog',
  templateUrl: 'user-delete-dialog.html',
})
export class UserDeleteDialogComponent { }
