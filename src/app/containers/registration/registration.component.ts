import { Component, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/services/http-handler.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private handler: HttpHandlerService) { }

  public ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  get f() { return this.registerForm.controls; }

  public onSubmit(user) {
    this.submitted = true;


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(user);
    this.handler.register(user).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      console.log("error", "cannot register")
    });

  }

}
