import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private userService = inject(UserService)

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        console.log("Conexión exitosa desde Firebase:", data);
      },
      error: (err) => {
        console.error("Error al conectar con la API:", err);
      }
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Credeciales correctas", this.loginForm.value);

    } else {

      this.loginForm.markAllAsTouched();
      console.log("El formulario contiene errores");
    }
  }
}
