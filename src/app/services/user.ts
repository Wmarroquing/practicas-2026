import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: "root"})
export class UserService {
    private http= inject(HttpClient)

    private apiUrl = 'https://firestore.googleapis.com/v1/projects/practicas-2026/databases/(default)/documents/usuarios';
    getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


    registrarUsuario(userData: any): Observable<any> {
      const body = {
        fields: {
          Nombre: { stringValue: userData.nombre },
          Apellido: { stringValue: userData.apellido },
          edad: { integerValue: Number(userData.edad) },
          correo: { stringValue: userData.correo },
          genero: { stringValue: userData.genero },
          password: { stringValue: userData.password }
        }
      };

      return this.http.post<any>(this.apiUrl, body);
    }
}


