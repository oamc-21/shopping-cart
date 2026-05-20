import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'
  constructor(private readonly http: HttpClient){}

  login(credentials: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(

      tap((response) =>{
        if(response && response.accessToken){
          localStorage.setItem('token', response.accessToken)
        }
      })
    )
  }

  register(userData: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  logout(): void{
    localStorage.removeItem('token')
  }
}
