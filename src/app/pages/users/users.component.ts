import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('@users'));
    if (!this.users) {
      this.userSubscription = this.userService.getUsers().subscribe(
        (users: User[]) => {
          this.users = users;
          localStorage.setItem('@users', JSON.stringify(users));
        }
      );
    }
  }

  public navigateToUserConfig(userId?: string): void {
    userId
      ? this.router.navigate(['/user-create', userId])
      : this.router.navigate(['/user-create']);
  }

  public ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }
}
