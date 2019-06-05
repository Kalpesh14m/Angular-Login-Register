import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/models/Login';
import { Registration } from 'src/app/models/Registration';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {


  constructor(private http: HttpClient) {
  }

  private httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token')
    
    })
  };

  public login(config: Login): Observable<any> {
    return this.http.post<any>(`${environment.base_url}login`, config, { observe: 'response' });
  }

  public register(config: Registration): Observable<any> {
    return this.http.post<any>(`${environment.base_url}registration`, config);
  }
}
