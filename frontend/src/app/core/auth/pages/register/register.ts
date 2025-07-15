import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton
  ]
})
export class Register {
  error = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;

    this.auth.register(username!, password!).subscribe({
      next: (res) => {
        console.log('Registration response:', res);
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.error = 'Registration failed';
      }
    });
  }

  get username(): AbstractControl {
    return this.form.get('username')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }
}
