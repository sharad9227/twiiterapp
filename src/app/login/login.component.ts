import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../services/user.service'
import { AccountService } from '../services/account.service';
import {AlertService} from '../services/alert.service'
import { User } from 'src/models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private userDetails;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,


) {



 }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

   // convenience getter for easy access to form fields
   get form() { return this.loginForm.controls; }
 onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userDetails={'email':'','password':''};
        this.userDetails.email=this.form.username.value;
        this.userDetails.password= this.form.password.value;
        this.userService.login(this.userDetails)
            .pipe(first())
            .subscribe(
                data => {
                   // this.router.navigate([this.returnUrl]);
                   localStorage.setItem('user', JSON.stringify(this.userDetails));
                   this.router.navigate(['/home/'])
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
