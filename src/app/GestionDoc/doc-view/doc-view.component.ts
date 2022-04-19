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

var myfile = [];


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
user:User=this.tokenStorageService.getUser();

retrieveResonse: any;
base64Data: any;
retrievedFile: any;
i:number;
private roles: string[] = [];
isLoggedIn = false;
showAdminBoard = false;

userid:any;

  constructor(private httpClient: HttpClient,private route: ActivatedRoute, private gestionDocService: GestionDocService,private router: Router,private modalService: NgbModal, private tokenStorageService : TokenStorageService,private userService: UserServiceGestService ,private sanitizer: DomSanitizer,
    ) { }

    ngOnInit() {


//this.route.params.subscribe(params => {
  
 /* if(params['searchTerm']) {
    this.searchTerm=params['searchTerm'];
  this.documents=this.gestionDocService.getDocList().pipe(filter(doc => doc.titre.toLocaleLowerCase().includes(params['searchTerm'].toLocaleLowerCase())));
  myfile = JSON.parse( localStorage.getItem(this.tokenStorageService.getUser().id));
  this.userid = this.user.id;
  console.log( this.user, this.userid,myfile);*/

/*
   this.reloadData();
   this.idu=this.tokenStorageService.getId();
   this.user=this.tokenStorageService.getUser();
 console.log(this.idu , this.user);*/
 /*this.roles = this.tokenStorageService.getUser().roles;
 console.log(this.roles);
 this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

 }
  else*/
      this.reloadData();
    // myfile = JSON.parse( localStorage.getItem(this.tokenStorageService.getUser().id));
     this.userid = this.user.id;
     console.log( this.user, this.userid,myfile);

/*
      this.reloadData();
      this.idu=this.tokenStorageService.getId();
      this.user=this.tokenStorageService.getUser();
    console.log(this.idu , this.user);*/
    this.roles = this.tokenStorageService.getUser().roles;
    console.log(this.roles);
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
 // })
   
  } 

    reloadData() {
      this.documents = this.gestionDocService.getDocList();
    console.log(this.documents);}

    tofav(doc:any){
     // this.gestionDocService.AddToFav(this.userid,doc.idd);
      //console.log(this.userid , doc.idd , 'hna');
     
      /*if(this.user.doc_favoris.indexOf(doc)==-1){
       this.user.doc_favoris.push(doc);
        console.log("tpusha");
      }*/
     

      this.gestionDocService.getDoc(doc.id).subscribe((data) => {
        console.log(myfile);
        if(this.user.doc_favoris.indexOf(doc)==-1){
        if(myfile?.indexOf(doc)==-1){
            console.log(myfile);

            myfile?.push(doc);
            console.log("tpusha", myfile);
            this.user.doc_favoris.push(doc);
console.log(this.user.doc_favoris);

            localStorage.setItem(this.userid, JSON.stringify(myfile));
            console.log("done");
          /* console.log(typeof( this.user.doc_favoris));
              this.gestionDocService.ToFav(this.user.id, this.user.doc_favoris).subscribe(
                data => {
                  console.log(data, "updated");
                },
                error => {
                  console.log(error);
                }
              );*/
      }
    } 
      });
      this.favorita(doc);
    }

    favorita(doc){
      this.i = 0;
   // this.user.doc_favoris.forEach(ff =>  {
    myfile?.forEach(ff =>  {  
   if(ff.id == doc.id){
        this.i++;
      }
    });
    if( this.i == 0 ){return false;}
    else{return true;}
    }

    fromfav(doc:any){
    //  this.gestionDocService.RemoveFromFav(this.userid,idd);
     // this.isfav=false;

     const index: number = myfile.indexOf(doc);
     console.log(index);
     if (index != -1){
       //this.user.doc_favoris.splice(index,1);
       myfile.splice(index,1);
      //localStorage.removeItem(JSON.stringify(myfile[index]));
      console.log(myfile);
      localStorage.setItem(this.userid, JSON.stringify(myfile));

     }
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
    
/*set the separator keys.*/
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
/*our custom add method which will take matChipInputTokenEnd event as input.*/
  add(event: MatChipInputEvent): void {
/*we will store the input and value in local variables.*/
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {  
 /*the input string will be pushed to the tag list.*/
      this.Tags.push(value);
    }
    if (input) {
/*after storing the input we will clear the input field.*/
      input.value = '';
    }
  }
  
/*custom method to remove a tag.*/
  remove(tag: string): void {
    const index = this.Tags.indexOf(tag);
    if (index >= 0) 
    {/*the tag of a particular index is removed from the tag list.*/
      this.Tags.splice(index, 1);
    }
  }

/*
    Remember(id: number) {
      this.gestionDocService.getDoc(id).subscribe((data) => {
        if (myfile == null) {
          myfile = [];
        }
        myfile.push(data);
        localStorage.setItem(this.userid, JSON.stringify(myfile));
        this.tofav(myfile);
        console.log("done");
      });
    }*/

searchh():void{
  if(this.searchTerm)
  this.router.navigateByUrl('/search/'+this.searchTerm);
}


 


/*Search(){
  //if(this.titre==""){ this.ngOnInit();}
  
  //else {
    this.documents=this.documents.pipe(filter((doc:any) =>{
      console.log(doc);
    console.log(this.titre);
    if (!this.titre) {
      return true;
    }
    if (doc.titre === "undefined") {
      return doc.titre.toLocaleLowerCase().includes(this.titre.toLocaleLowerCase());
    } else {
      return doc.titre.toLocaleLowerCase().includes(this.titre.toLocaleLowerCase());
    }}))
     // return doc.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase())}) )
  
 /* else {
    console.log(this.titre);
     this.documents = this.gestionDocService.getDocByName(this.titre);
     console.log(this.documents);
      //return doc.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase())}) )*/
 //}
}
//}
