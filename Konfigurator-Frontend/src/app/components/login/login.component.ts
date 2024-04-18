import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any = this.storageService.getUser();

  loginForm = new FormGroup({
    userInput: new FormControl(''),
    passwordInput: new FormControl('')
  });

  constructor(private apiService: ApiService, private storageService: StorageService){}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  loginUser(){
    let Input = this.loginForm.value;
    this.apiService.UserLogin(Input.userInput,Input.passwordInput)
    .subscribe({
      next: data => {
        let token = data["jwtToken"];
        let user = data["username"];
        console.log(data);
        this.storageService.saveUser(token, user);
        this.currentUser = user;
        this.isLoginFailed = false;
        this.isLoggedIn = true;

      },
      error: err => {
        this.errorMessage = err.error;
        console.log(this.errorMessage);
        this.isLoginFailed = true;
      },
    });
  }

  logoutUser(){
    this.storageService.clean();
    //window.location.reload();
    this.isLoggedIn = false;
    this.isLoginFailed = false;
    this.errorMessage = '';
    this.currentUser = this.storageService.getUser();
  }

}
