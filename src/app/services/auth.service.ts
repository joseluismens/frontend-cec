import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/loginForm';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url=environment.base_url;

  constructor(private http: HttpClient, private router:Router) { }

  inciarSesion(data: LoginForm) {
    return this.http.post(`${this.base_url}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('id', res.id),
          localStorage.setItem('correo', res.username),
          localStorage.setItem('nombres', res.username),
          localStorage.setItem('apellidos', res.username),

          localStorage.setItem('token', res.token)


      })
    );
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
