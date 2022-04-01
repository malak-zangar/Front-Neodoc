import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionDocService {
  private baseUrl = 'http://localhost:9090/document';

  constructor(private http: HttpClient) { }

  uploadDoc(document: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/upload`, document);
  }
  getDocList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  deleteDoc(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

 updateDoc(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  getDoc(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  downloadDoc(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${id}`,
    {observe:'response',responseType:'blob'});
  }
 
}
