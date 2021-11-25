import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'src/models/User';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public tweetForm:FormGroup;
private userName:User;
public allTweets:User[];


public tweetMessage={
  message: ''

}
  constructor(private fb:FormBuilder, private userService: UserService) {

   }

   get form() { return this.tweetForm.controls; }

  async ngOnInit() {
    this.tweetForm=this.fb.group({
      tweetMessage: [''],
    })

    await this.userService.getAll() .subscribe(
      data => {
      this.allTweets = data;

      },
      error=>{

        alert("erorr in fetch"+error);
      });


  }




  onSubmit(){
     // stop here if form is invalid
     if (this.tweetForm.invalid) {
      return;
  }

    this.userName=JSON.parse(localStorage.getItem('user'));
    this.tweetMessage.message=this.form.tweetMessage.value;
     this.userService.saveTweet(this.userName.loginId, this.tweetMessage)
    .pipe(first())
    .subscribe(
        data => {
          alert(JSON.stringify(data));
           // this.router.navigate([this.returnUrl]);
          // this.router.navigate(['/home/'])
        },
        error => {
          alert(JSON.stringify(error));
            // this.alertService.error(error);
            // this.loading = false;
        });
  }
}
