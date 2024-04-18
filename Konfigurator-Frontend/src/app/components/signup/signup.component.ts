import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {


  isLoggedIn = false;
  errorMessage = '';

  signupForm = new FormGroup({
    userInput: new FormControl(''),
    passwordInput: new FormControl('')
  });

  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router){}
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(["/login"]);

    }
  }


  signupUser(){
    let Input = this.signupForm.value;
    if(Input.userInput == "" || Input.passwordInput == "")
    {
      return;
    }
    this.apiService.UserRegistration(Input.userInput,Input.passwordInput)
    .subscribe({
      next: data => {
        console.log(data);
        this.apiService.UserLogin(Input.userInput,Input.passwordInput)
        .subscribe({
          next: data => {
            let token = data["jwtToken"];
            let user = data["username"];
            console.log(data);
            this.storageService.saveUser(token, user);
            this.isLoggedIn = true;          
            this.errorMessage = '';
            this.router.navigate(["/"]);
          },
          error: err => {
            this.errorMessage = err.error;
            console.log(this.errorMessage);
          },
        });
      },
      error: err => {
        this.errorMessage = err.error;
        console.log(this.errorMessage)
        //alert(this.errorMessage);
      },
    });
  }

}
