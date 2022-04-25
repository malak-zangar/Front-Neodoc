import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { fromEvent, Observable } from 'rxjs';
import { GestionDocService } from '../gestion-doc.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/GestionUser/user';
import { DomSanitizer } from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import { UserServiceGestService } from 'src/app/GestionUser/user-service-gest.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';

var myfile = [] ;


@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss']
})


export class DocViewComponent implements OnInit {
  @ViewChild("inputElement",{static:true}) inputElement : ElementRef<HTMLInputElement>;

p: number = 1;
count: number = 15;
searchText;
searchTerm: string = "";

//titre;
//dep;
form:any={titre:null,type:null,departements: null};

closeResult: string;  
Tags: string[] = [];

docu:Document;
documents: Observable<any[]> | any;
doc:any;

id: number;
isfav: boolean;
idu:number;
user:User;
usere:User;
retrieveResonse: any;
base64Data: any;
retrievedFile: any;
i:number;
private roles: string[] = [];
isLoggedIn = false;
showAdminBoard:boolean;
userid:any;

  constructor(private userservice:UserServiceGestService,private httpClient: HttpClient,private route: ActivatedRoute, private gestionDocService: GestionDocService,private router: Router,private modalService: NgbModal, private tokenStorageService : TokenStorageService,private userService: UserServiceGestService ,private sanitizer: DomSanitizer,
    ) { }

    ngOnInit() {

  this.getActivatedUser();

  this.reloadData();

    //this.user=this.tokenStorageService.getUser();
   
   // this.userid = this.user.id;
    //console.log( this.user, this.userid);
    //this.roles = this.tokenStorageService.getUser().roles;
    //console.log(this.roles);
    //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showAdminBoard=this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN');

  } 
users:any;
  getActivatedUser(){
    this.userService.getUserList().subscribe(data => {
      this.users = data;
      console.log(this.tokenStorageService.getId());
      console.log(this.users.length);
      for(let aU of this.users){
        console.log(aU.id);
        if(aU.id === this.tokenStorageService.getId()){
          console.log(aU.id);
          this.user = aU;
          break;
        }
      }
      console.log("ererererererere");
      console.log (this.user);
      
    });
  }

    reloadData() {
      this.documents = this.gestionDocService.getDocList();
   }

    tofav(doc:any){
      if(this.user.doc_favoris.indexOf(doc)==-1){
        this.user.doc_favoris.push(doc);
      //  this.tokenStorageService.saveUser(this.user);
      }

      this.gestionDocService.getDoc(doc.id).subscribe((data) => {
        console.log(data);
              const formData = new FormData();
              formData.append("doc",doc.id);
              this.httpClient.put('http://localhost:9090/api/favorite/addtofav/'+this.user.id+'/'+doc.id,formData)
              .subscribe(
                data => {
                  console.log(data);
                    this.reloadData();
                    console.log(this.user.doc_favoris);
                   // alert('document ajouté au fav.');
                    console.log(this.user);
                  }, 
                error => {console.log(error);
                  alert("doc non ajouté"); }
                ); 

      });
      this.favorita(doc);
    }

    favorita(doc:any){
    
      this.i = 0;
    this.user.doc_favoris.forEach(ff =>  {
   if(ff.id == doc.id){
        this.i++;
      }
    });
    if( this.i == 0 ){return false;}
    else{return true;}
    }

    fromfav(doc:any){
      if(this.user.doc_favoris.indexOf(doc)!= -1){
      
        this.user.doc_favoris.splice(this.user.doc_favoris.indexOf(doc),1);
      
      //  this.tokenStorageService.saveUser(this.user);
        this.reloadData();
      }
      else{console.log("mch mawjoud");}
        this.httpClient.delete('http://localhost:9090/api/favorite/doc/'+this.user.id+'/'+doc.id)
        .subscribe(
          data => {
            console.log(data);
            console.log(this.user.doc_favoris);
             console.log(this.user.doc_favoris.indexOf(doc));
             this.reloadData();

            // alert('document retiré du fav');
            console.log(this.user.doc_favoris);
            }, 
          error => {console.log(error);
            alert("doc non retiré");}
          );
        this.favorita(doc);

    }

    deleteDoc(id: number) {
      this.gestionDocService.deleteDoc(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }

    downloadDoc(id: number,titre : string) {
      this.gestionDocService.downloadDoc(id)
        .subscribe(
          data => {
          let fileName=titre;
            let blob:Blob=data.body as Blob;
            let a = document.createElement('a');
            a.download=fileName;
            a.href=window.URL.createObjectURL(blob);
            a.click();
          },
          error => console.log(error));
    }

    open(content, id) {  
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
          this.deleteDoc(id);  
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });  
    }  
    
    opene(contente,id) {  
      this.doc = new Document();
      this.gestionDocService.getDoc(id)
      .subscribe(data => {
        console.log(data)
        this.doc = data;
        this.form['titre']=this.doc.titre;
        this.form['type']=this.doc.type;
        this.form['departements']=this.doc.departements;

        for(var i=0;i<this.doc.tags.length;i++){
        this.Tags.push(this.doc.tags[i].libelle);
        console.log(this.doc.tags[i].libelle);
      }

        this.id=id;
        console.log(this.form);
        console.log(this.doc.tags);
      }, 
      error => console.log(error));

      this.modalService.open(contente, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
          console.log(this.doc);  
          this.updateDoc()
        }  
      }, (reason) => {  
        this.Tags=[];  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });  
    }  

    private getDismissReason(reason: any): string { 
 
      if (reason === ModalDismissReasons.ESC) { 
        this.Tags=[];  
        return 'by pressing ESC';  
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
        this.Tags=[];  
        return 'by clicking on a backdrop';  
      } else {  
        this.Tags=[];  
        return `with: ${reason}`;  
      }  
    }  



    updateDoc() {
      let {titre,type,departements} = this.form;
      console.log(this.form , titre , type , departements);
      const formData = new FormData();

    formData.append("titre",titre);
    formData.append("dep",departements);
    for (var j=0;j<this.Tags.length;j++){
      formData.append("tags",this.Tags[j]);}
    console.log(titre+" "+departements+ " " +this.Tags);
    this.httpClient.put('http://localhost:9090/document/update/'+this.id,formData)
    .subscribe(
      data => {
        this.doc = new Document();
          this.reloadData();
          alert('document modifié avec succcés.'); 
        this.Tags=[];
        }, 
      error => {console.log(error);
        alert("Modification échouée essayer autrement, peut etre le nom du fichier " + titre + " existe déja dans le departement " + departements);
        this.Tags=[];
      }
      ); }
  
    retour(){
      this.router.navigate(['doc-view']);
      this.Tags=[];  
    }

    //afficher doc
    afficher(id: number) {
      this.gestionDocService.getDoc(id).subscribe(
        (res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.data;
       
       var blob = new Blob([this._base64ToArrayBuffer(this.base64Data)], {
          type:this.retrieveResonse.type, 
        });
        console.log(blob);
        const url = URL.createObjectURL(blob);
        this.retrievedFile = window.open(url,this.retrieveResonse.titre);
      });
    }

    _base64ToArrayBuffer(base64Data) {
      const binary_string = window.atob(base64Data);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
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

SearchTag(){
  let {tagr} = this.form;
  console.log(tagr);
  if(tagr!=null)
  {this.documents = this.gestionDocService.getDocByTag(tagr);}
}
SearchTitre(){
  let {titre} = this.form;
  console.log(titre);
  this.documents = this.gestionDocService.getDocByTit(titre);
}
SearchType(){
  let {type} = this.form;
  console.log(type);
  this.documents = this.gestionDocService.getDocByType(type);
}
SearchDep(){
  let {dep} = this.form;
  console.log(dep);
  this.documents = this.gestionDocService.getDocByDep(dep);
}
}