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
}
