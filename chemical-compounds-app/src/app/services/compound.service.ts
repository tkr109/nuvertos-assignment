import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/api/compounds';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCompounds(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getCompoundById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateCompound(id: number, compound: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();  
    return this.http.put(`${this.apiUrl}/${id}`, compound, { headers });  
  }

  deleteCompound(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();  
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
