import { Component } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class Register {
  error = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    this.auth.register(username!, password!).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.error = 'Registration failed')
    });
  }
}
