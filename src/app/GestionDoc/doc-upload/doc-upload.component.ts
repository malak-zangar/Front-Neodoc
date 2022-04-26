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
import { UploadFileService } from 'src/app/upload-file.service';
import { TaggedFile } from '../tagged-file';
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

  constructor(private GestionDocService: GestionDocService, private uploadService: UploadFileService,
    private router: Router,private httpClient: HttpClient , private modalService: NgbModal,private tokenStorageService :TokenStorageService) { }

  ngOnInit(): void { 
    this.roles = this.tokenStorageService.getUser().roles;
    console.log(this.roles);
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

  }

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
 
/*
  @ViewChild('container',{read:ViewContainerRef,static:false}) container: ViewContainerRef;
  @ViewChild("inputElement",{static:true}) inputElement : ElementRef<HTMLInputElement>;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver: boolean = false;
  progress = 0;
  messagee = '';
  fileInfos: Observable<any>;
  displayTagModal: boolean = false;
  taggedFiles: TaggedFile[] = [];
  selectedTags: Tag[] = []
  filteredTags: Tag[] = [];
  tags: Tag[] = [];
  searchTerm: string = "";
  tagged: boolean = false;

  public selectedFileIndex: number;
  selectedSearchTags: Tag[] = [];

 

  fileOverBase(e: any): void {
    console.log(e)
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    //this.getTags();
    fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        tap(searchTerm => {
          this.searchTerm = searchTerm;
          console.log(this.searchTerm)
        }),
        tap(_ => this.fileInfos = this.filterFiles()),
      )
      .subscribe();
  }

  getTags(){
    this.uploadService.getTags().subscribe(tags => this.tags = tags)
  }

  handelTagSelection(){
    this.fileInfos = this.filterFiles()
  }

  filterFiles():Observable<any>{
    return this.uploadService.filterFiles(this.searchTerm,this.selectedSearchTags)
  }


  populateTaggedFiles() {
    for(let i=this.taggedFiles.length; i<this.uploader.queue.length;i++){
      let file = this.uploader.queue[i]._file;
      //let uniqueName: string = UUID.UUID() + file.name.substr(file.name.lastIndexOf('.'), file.name.length)
      this.taggedFiles.push(new TaggedFile(file))
    }
  }

  uploadMultiple() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      let data = new FormData();
      data.append('file', fileItem);
      this.taggedFiles[i].isUploading = true;
      this.upload(data,this.taggedFiles[i].progress);

    }
    this.uploadService.uploadMultiple(this.taggedFiles).subscribe(res=> this.fileInfos = this.uploadService.getFiles())
    this.uploader.clearQueue();
    this.taggedFiles = [];
  }

  upload(data: FormData,progress:number) {
    this.uploadService.upload(data).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.messagee = event.body.message;
        }
      },
      err => {
        progress = 0;
        this.messagee = 'Could not upload the file!';
      });
  }

  tagFile(fileIndex: number) {
    this.displayTagModal = true;
    this.selectedFileIndex = fileIndex;
    this.selectedTags = [...this.taggedFiles[fileIndex].tags];
  }

  filterTags(searchWord: any) {
    this.filteredTags = [];
    this.tags.filter(tag => tag.label.toLowerCase().includes(searchWord.query.toLowerCase())).map(o => {
      this.filteredTags.push(o);
    });
  }

  saveTagSelection() {
    this.taggedFiles[this.selectedFileIndex].tags = [...this.selectedTags];
    this.selectedTags = [];
    this.selectedFileIndex = undefined;
    this.tagged = true;
    console.log("this.taggedFiles.length");
    console.log(this.taggedFiles.length);
    console.log(this.taggedFiles);
    for(let i=0; i<this.taggedFiles.length;i++){
      if(this.taggedFiles[i].tags.length==0){
        this.tagged = false;
        console.log(this.taggedFiles[i]);
        console.log("fffffffffff");
      }
    }
  }

  deleteFileFromQueue(fileIndex: number) {
    let file: FileItem = this.uploader.queue[fileIndex];
    this.uploader.removeFromQueue(file);
    this.taggedFiles.splice(fileIndex,1);
  }
   public toggleSelected() {
     this.selected = !this.selected;
     this.selectedChange.emit(this.selected);
   }
*/

}





  
  
