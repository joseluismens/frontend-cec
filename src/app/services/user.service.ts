import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { registerForm } from '../interfaces/registerForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url=environment.base_url;
  constructor(private http: HttpClient, private router:Router) { }

  crearUsuario(data:registerForm){
    return this.http.post(`${this.base_url}/users`,data);
  }
}
