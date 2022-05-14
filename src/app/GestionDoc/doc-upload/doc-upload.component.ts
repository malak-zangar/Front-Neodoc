import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from "@angular/core";
import {GestionDocService} from '../gestion-doc.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Tag } from '../tag';

import { ComponentFactoryResolver, ViewContainerRef, EventEmitter, Input, Output} from '@angular/core';
  import {HttpResponse, HttpEventType} from '@angular/common/http';
  import {fromEvent, Observable} from 'rxjs';
  import {FileItem, FileUploader} from "ng2-file-upload";
  import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {
  closeResult: string;  
doc:any;
private roles: string[] = [];
isLoggedIn=false;
  constructor(private GestionDocService: GestionDocService, 
    private router: Router,private httpClient: HttpClient , private modalService: NgbModal,private tokenStorageService :TokenStorageService) { }

  ngOnInit(): void { 
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      
    this.roles = this.tokenStorageService.getUser().roles;
    console.log(this.roles);
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

  }}

//////// ekher wahed ////////////

@ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
files: any|Blob[] = [];
message='';
dep:string;
Tags: string[] = [];
form: any = {dep: null};
showAdminBoard = false;
errorMessage = '';
isuploaded:boolean=true;

// on file drop handler
onFileDropped($event) {
  this.prepareFilesList($event);}


 // handle file from browsing
 fileBrowseHandler(files) {
  this.prepareFilesList(files);}

/** * Delete file from files list
 * @param index (File index) */
deleteFile(index: number) {
  if (this.files[index].progress < 100) {
    console.log("Upload in progress.");
    return; }
  this.files.splice(index, 1);}
  
  
 // Simulate the upload process
uploadFilesSimulator(index: number) {
  setTimeout(() => {
    if (index === this.files.length) {
      return;
    } else {
      const progressInterval = setInterval(() => {
        if (this.files[index].progress === 100) {
          clearInterval(progressInterval);
          this.uploadFilesSimulator(index + 1);
        } else {
          this.files[index].progress += 5;
        }
      }, 200);
    }
  }, 1000);
}

/*** Convert Files list to normal array list
 * @param files (Files List)*/
prepareFilesList(files: Array<any>) {
  for (const item of files) {
    item.progress = 0;
    this.files.push(item);  }
  this.fileDropEl.nativeElement.value = "";
  this.uploadFilesSimulator(0);}

/**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];}

submit(){
  let {dep} = this.form;
  const formData = new FormData();
  for (var i = 0; i < this.files.length; i++) { 
    console.log("Tags", this.Tags);
    formData.append("files", this.files[i]); 
  for (var j=0;j<this.Tags.length;j++){
    formData.append("tags",this.Tags[j]);}
    console.log(dep);
    if (dep==null){
      dep=this.tokenStorageService.getUser().poste;
      console.log(dep);
      formData.append("dep",this.tokenStorageService.getUser().poste);
    }
    else { formData.append("dep",dep);}
    console.log(this.files[i]);

 }
  this.httpClient.post('http://localhost:9090/document/upload', formData)
    .subscribe(
      res => {console.log(res);
        this.router.navigate(['/doc-view']) ;
      alert('document ajouté avec succcés.');
    },
    err => {
      this.isuploaded = false;
      this.errorMessage = err.error.message;
      //alert(err.error.message);
    })

}

open(content, i) {  
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
    this.closeResult = `Closed with: ${result}`;  
    if (result === 'yes') {  
       this.add(i);
    }  
  }, (reason) => {  
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
  });  
}

private getDismissReason(reason: any): string {  
  if (reason === ModalDismissReasons.ESC) {  
    return 'by pressing ESC';  
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
    return 'by clicking on a backdrop';  
  } else {  
    return `with: ${reason}`;  
  }  
}  

visible = true;
selectable = true;
removable = true;
  

readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;
  if ((value || '').trim()) {  
    this.Tags.push(value);
  }
  if (input) {input.value = '';}
}


remove(tag: string): void {
  const index = this.Tags.indexOf(tag);
  if (index >= 0) 
  {this.Tags.splice(index, 1);}
}

}





  
  
