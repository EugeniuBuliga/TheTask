import { Component } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatFormField, MatLabel, MatError, MatInput, MatButton, MatProgressSpinner],
})
export class Login {
  error = '';
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/main']);
      },
      error: () => {
        this.loading = false;
        return (this.error = 'Invalid credentials');
      },
    });
  }

  get username(): AbstractControl {
    return this.form.get('username')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }
}
