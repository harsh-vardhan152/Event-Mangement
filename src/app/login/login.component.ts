import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(private frombulider: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.frombulider.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('harsh@gmail.com'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('abc'),
        ],
      ],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm);
  }
}
