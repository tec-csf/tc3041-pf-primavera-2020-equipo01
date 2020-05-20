import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  register = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if(!f.valid){
      this.toastr.error("Please fill in all the fields");
      return;
    }
    // Create the user person
    const user = {
      username: this.username,
      password: this.password
    }

    if (this.register){
      this.authService.registerUser(user).subscribe((data: any) => {
        if (data.success) {
          this.authService.authenticateUser(user).subscribe((data:any) => {
            if (data.success) {
              // If the login is success we are going to store the data into the local storage
              this.authService.storeUserData(data.token, data.user)
              // Show message as logged in
              this.toastr.success("Wellcome to covid-19 data");
              this.router.navigate(['/cases']);
            } else {
              // Show message as cant log in
              this.toastr.error(data.msg);
            }
          });
          this.router.navigate(['/cases']);
        } else {
          // Show message as cant log in
          this.toastr.error(data.msg);
        }
      });
    } else {
      // Create the petition to authenticate the user and get all the data from the database
      this.authService.authenticateUser(user).subscribe((data:any) => {
        if (data.success) {
          // If the login is success we are going to store the data into the local storage
          this.authService.storeUserData(data.token, data.user)
          // Show message as logged in
          this.toastr.success("Wellcome to covid-19 data");
          this.router.navigate(['/cases']);
        } else {
          // Show message as cant log in
          this.toastr.error(data.msg);
        }
      });
    }
  }

}
