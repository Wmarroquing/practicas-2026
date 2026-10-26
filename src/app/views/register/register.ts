import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private userService = inject(UserService);
  private router = inject(Router);
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      genero: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const nuevoUsuario = this.registerForm.value;

      this.userService.registrarUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          console.log("Usuario registrado con éxito en Firebase:", response);

        },
        error: (err) => {
          console.error("Error al registrar el usuario:", err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      console.log("El formulario de registro tiene errores");
    }
  }
}
