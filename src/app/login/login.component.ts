import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.services';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    userLogin = new FormGroup({
        userEmail: new FormControl('', [
            Validators.required,
            Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]),
        password: new FormControl('', [
            Validators.required,
        ])
    });
    //   Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }

    get userEmail() {
        return this.userLogin.get('userEmail');
    }

    get password() {
        return this.userLogin.get('password');
    }
    ngOnInit() {
    }

    // convenience getter for easy access to form fields
    get f() { return this.userLogin.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.userLogin.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.login(this.f['userEmail'].value, this.f['password'].value)
            .subscribe({
                next: (res) => {
                    if (res) {
                        setTimeout(() => {                            
                            this.router.navigateByUrl('/home');                           
                          }, 5000);                     
                    }
                    else {
                        alert("User is not authorised");
                        this.loading = false;
                    }
                },
                error: error => {
                    alert("User is not authorised");
                    this.loading = false;
                }
            });
    }
}