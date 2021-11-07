import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import User from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.baseUrl}/db`).pipe(
      pluck('users'),
    );
  }

  public getUserById(id: string): User {
    const users: User[] = JSON.parse(localStorage.getItem('@users'));
    return users.find(user => user.id === id);
  }

  public saveUser(user: User): Observable<User> {
    return this._http.post<User>(`${environment.baseUrl}/users`, user).pipe(
      tap(console.log)
    );
  }
}
