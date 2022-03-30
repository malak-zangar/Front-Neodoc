import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from "@angular/core";
import {GestionDocService} from '../gestion-doc.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {

  constructor(private GestionDocService: GestionDocService,
    private router: Router,private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  /*
  selectedFile: File[];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message='';
  imageName: any;*/

  /////// METH1 //////
  /*
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9090/document/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      ); 
  }*/
/*
  postFile(caption: any, fileToUpload:File){
       const endpoint="http://localhost:9090/document/upload" ;
       const formData : FormData=new FormData();
       formData.append('files',fileToUpload,fileToUpload.name);
       formData.append('ImageCaption',caption);
       return this.httpClient.post(endpoint,formData);
  }

  fileToUpload: File=null;
  handlerFileInput(file: FileList){
    this.fileToUpload=file.item(0);
  }
  OnSubmit(Caption:any , Image:any)
{
this.postFile(Caption.value,this.fileToUpload).subscribe(
  data => {
    Caption.value=null;
    Image.value=null;
  }
);
}

myFiles:string [] = [];

onFileChange(event:any) {
      for (var i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
      }

}

submit(){

  const formData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) { 
    formData.append("files", this.myFiles[i]);
  }



  this.httpClient.post('http://localhost:9090/document/upload', formData)

    .subscribe(res => {

      console.log(res);

      alert('Uploaded Successfully.');

    })

}*/


//////// ekher wahed ////////////

@ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
files: any|Blob[] = [];
message='';

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
  const formData = new FormData();
  for (var i = 0; i < this.files.length; i++) { 
    formData.append("files", this.files[i]); }

  this.httpClient.post('http://localhost:9090/document/upload', formData)
    .subscribe(
      res => {console.log(res);
        this.router.navigate(['/doc-view']) ;
      alert('document ajouté avec succcés.');
    })

}

}





  
  
