import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AccountService } from "./services/account.services";


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: any;


    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        this.accountService.user.subscribe((x: any) => x ? this.user = x : this.user = false);
    }

    logout() {
        this.accountService.logout();
        this.router.navigate(['/login']);
    }
    getUrl() {
        return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";
    }
}