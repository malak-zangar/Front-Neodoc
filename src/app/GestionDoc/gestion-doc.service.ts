import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../GestionUser/user';

@Injectable({
  providedIn: 'root'
})
export class GestionDocService {
  private baseUrl = 'http://localhost:9090/document';

  constructor(private http: HttpClient) { }

  uploadDoc(document: Object,tags:Set<String>): Observable<Object> {
    return this.http.post(`${this.baseUrl}/upload`, {document,tags});
  }
  getDocList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  getDocListFav(id: number): Observable<any> {
    return this.http.get(`http://localhost:9090/api/favorite/doc/${id}`);
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

  getDocByName(titre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${titre}`);
  }

  downloadDoc(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${id}`,{observe:'response',responseType:'blob'});
  }

  AddToFav(idu: number , idd: number): Observable<Object> {
    return this.http.put(`http://localhost:9090/api/favorite/doc/${idu}/${idd}`, { responseType: 'text' });}

  RemoveFromFav(idu:number,idd:number): Observable<Object> {
    return this.http.delete(`http://localhost:9090/api/favorite/doc/${idu}/${idd}`, { responseType: 'text' });}
 
    ToFav(idu: number , fav: any[]): Observable<Object> {
      return this.http.put(`http://localhost:9090/api/favorite/doc/${idu}`,{fav}, { responseType: 'text' });}

}


