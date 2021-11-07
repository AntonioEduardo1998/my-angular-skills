import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public userId: string;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

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
    console.log(user);
    let users: User[] = JSON.parse(localStorage.getItem('@users'));
    const userExist = users.findIndex(u => u.id === user.id);
    if (!userExist) {
      users[userExist] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('@users', JSON.stringify(users));
  }
}
