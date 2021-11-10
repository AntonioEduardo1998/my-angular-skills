// eslint-disable-next-line max-classes-per-file
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mas-delete-dialog',
  templateUrl: 'user-delete-dialog.html',
})
export class UserDeleteDialogComponent { }

@Component({
  selector: 'mas-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];

  public userSubscription: Subscription;

  public loading = false;

  public placeholderDiv = document.getElementById('vizContainer');

  public url = 'https://public.tableau.com/views/All_Reports_0/Dashboard1?:embed=y&:display_count=yes';

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
        },
      });
    }
  }

  public navigateToUserConfig(userId?: string): void {
    if (userId) {
      this.router.navigate(['/user-create', userId]);
    } else {
      this.router.navigate(['/user-create']);
    }
  }

  public deleteUserById(userId: string): void {
    const users: User[] = JSON.parse(localStorage.getItem('@users'));
    const userIndex = users.findIndex((u) => u.id === userId);
    users.splice(userIndex, 1);
    localStorage.setItem('@users', JSON.stringify(users));
    this.users = users;
    this.openSnackBar('User deleted successfully ', 'close');
  }

  public ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
  }

  public openDialog(userId: string): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserById(userId);
      }
    });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
