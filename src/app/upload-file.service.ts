import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Tag } from './GestionDoc/tag';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {
  }

  upload(formData): Observable<any> {
    return this.http.post(`${this.baseUrl}/document/uploadd`, formData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  /*uploadMultiple(files: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/multipleFilesUpload`, {fileDtoList:files});
  }*/

  uploadMultiple(files: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/document/multipleFilesUpload`, {fileDtoList:files});
  }

 /* getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }*/
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/document/list`);
  }

  filterFiles(searchTerm: string, selectedTags: Tag[]) {
    let params:any = {}
    let options:any = {};
    params.searchTerm = searchTerm;
    options.params = params;
    return this.http.post(this.baseUrl+'/files/filtered',{tags:selectedTags},options)
  }

  /*getTags():Observable<any> {
    return this.http.get(this.baseUrl+'/tags');
  }*/
}
