import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { loginData } from '../constant';
import { User } from 'src/models/user';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;


    constructor(
        private router: Router,
       
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    login(username: string, password: string) {  
      
       let loginstatus = loginData.filter(x=>x.username ===username && x.password ===password);
       if(loginstatus && loginstatus.length > 0)
       {
        let objUser = new User();
        objUser.emailusername =loginstatus[0].username;
        objUser.password = loginstatus[0].password;
        localStorage.setItem('user', JSON.stringify(loginstatus));
        this.userSubject.next(objUser);       
        return of(true);
       }
       else
       {
        return of(false);
       }     
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    public get userValue() {
        return this.userSubject.value;
    }
}