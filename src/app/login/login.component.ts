import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import {UserService} from '../services/user.service'
import { AccountService } from '../services/account.service';
import {AlertService} from '../services/alert.service'
import { User } from 'src/models/User';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private userDetails;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,


) {
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();


 }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
   // convenience getter for easy access to form fields
   get form() { return this.loginForm.controls; }
 onSubmit() {
        this.submitted = true;


        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userDetails={'email':'','password':''};
        this.userDetails.email=this.form.username.value;
        this.userDetails.password= this.form.password.value;
        this.userService.login(this.userDetails)
            .subscribe(
                data => {

                   // this.router.navigate([this.returnUrl]);
                   localStorage.setItem('user', JSON.stringify(this.userDetails));
                   this.currentUserSubject.next(this.userDetails);
                   this.router.navigate(['/home/'])

                },
                error => {
                   if(error.status != 200)
                   {
                    alert("Username or password is incorrect");
                    this.loading = false;
                   }
                });
    }





}
