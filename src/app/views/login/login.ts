import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private userService = inject(UserService)
  private router = inject(Router);

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
      const { email, password } = this.loginForm.value;
  
      this.userService.getUsuarios().subscribe({
        next: (response) => {
          
          const documents = response.documents || [];
          
          const usuarioEncontrado = documents.find((doc: any) => {
            const dbEmail = doc.fields.correo?.stringValue || doc.fields.email?.stringValue;
            const dbPassword = doc.fields.password?.stringValue;
            
            return dbEmail === email && dbPassword === password;
          });

          if (usuarioEncontrado) {
            console.log("Inicio de sesión exitoso", usuarioEncontrado);
            this.router.navigate(['/register']);
  
          } else {
            console.warn("Correo o contraseña incorrectos.");
          }
        },
        error: (err) => {
          console.error("Error al consultar los usuarios en la base de datos:", err);
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
      console.log("El formulario contiene errores de formato");
    }
  }
}
