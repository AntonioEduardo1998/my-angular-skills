import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { UserDeleteDialogComponent } from '@src/app/components/dialogs/user-delete-dialog';
import User from '@src/app/models/User';
import { UserService } from '@src/app/services/user.service';

@Component({
  selector: 'mas-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];

  public loading = false;

  private debounceSubject: Subject<string> = new Subject();

  private unsubscribe: Subject<void> = new Subject();

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
      this.userService.getUsers()
        .pipe(takeUntil(this.unsubscribe)).subscribe({
          next: (users: User[]) => {
            this.users = users;
            localStorage.setItem('@users', JSON.stringify(users));
          },
          complete: () => {
            this.setLoading(false);
          },
        });
    }

    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(200))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((userId) => {
        const users = JSON.parse(localStorage.getItem('@users'));
        const userIndex = users.findIndex((u: User) => u.id === userId);
        users[userIndex].liked = !users[userIndex].liked;
        localStorage.setItem('@users', JSON.stringify(users));
        this.users = users;
      });
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
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

  public like(userId: string): void {
    this.debounceSubject.next(userId);
  }

  public getLikedValue(userId: string): string {
    const userIndex = this.users.findIndex((u) => u.id === userId);
    return this.users[userIndex].liked
      ? 'favorite'
      : 'favorite_border';
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
