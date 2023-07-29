import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
      );
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const res = JSON.parse(JSON.stringify(user));
          if (res['success'] != true)
            return;
          var UserModel = this.getUser(user);
            localStorage.setItem('currentUser', JSON.stringify(UserModel));
          this.currentUserSubject.next(UserModel);
          // this.currentUserSubject.next(userRes);
          // console.log(JSON.parse(JSON.stringify(user))['data']);
          // console.log(this.currentUserSubject.value);
          return UserModel;
        })
      );
  }
  getUser(responseAuth) :User {
        var UserModel = new User();
        UserModel.email = responseAuth['data']['user']['email'];
        UserModel.role_id =this.getUserRoleType(responseAuth['data']['user']['role_id']);
        UserModel.user_id = responseAuth['data']['user']['user_id'];
        UserModel.token = responseAuth['data']['token'];
      return UserModel;
  }
  getUserRoleType(roleId) : Role {
    switch (roleId) {
      case 1: return Role.Admin;
      case 2: return Role.Staff;
      case 3: return Role.Teacher;
      case 4: return Role.Student;
      default: return Role.All;
      }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
