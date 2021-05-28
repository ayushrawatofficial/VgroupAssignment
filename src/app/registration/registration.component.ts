import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MustMatch } from '../shared/helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup | any;
  errMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        pwd: new FormControl('', Validators.required),
        confirmPwd: new FormControl('', Validators.required),
      },
      {
        validator: MustMatch('pwd', 'confirmPwd'),
      }
    );
  }

  register() {
    if(this.registerForm.value.email == this.cookieService.get('email')){
      this.errMessage = 'Email Id already Registered, Kindly login or use new Id';
    }
    else{
    this.cookieService.set('email', this.registerForm.value.email);
    this.cookieService.set('pwd', this.registerForm.value.pwd);
    this.cookieService.set('fname', this.registerForm.value.fname);
    this.route.navigate(['/login']);
  }
  }
}
