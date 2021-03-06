import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService  } from '../services/alert.service';
import {UserService} from '../services/user.service'
import {AuthenticationService} from '../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';




@Component({selector: 'register-user',templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }
          );
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
        this.loading = true;
        this.userService.register(this.registerForm.value,headers)
            .subscribe(
                data => {
                    if(data.status == 200)
                   {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                   }
                   else{
                    this.alertService.error("Error in Registration, please fill in mandatory fields and try again");

                  }

                   console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

