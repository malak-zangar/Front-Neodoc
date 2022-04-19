import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Observable } from 'rxjs';
import { GestionDocService } from '../gestion-doc.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/GestionUser/user';
import { DomSanitizer } from "@angular/platform-browser";
import {filter} from 'rxjs/operators';
import { UserServiceGestService } from 'src/app/GestionUser/user-service-gest.service';


var myfile = [];


@Component({
  selector: 'app-doc-fav',
  templateUrl: './doc-fav.component.html',
  styleUrls: ['./doc-fav.component.scss']
})
export class DocFavComponent implements OnInit {

  p: number = 1;
  count: number = 15;
  searchText;
  
  closeResult: string;  
  
  documents: Observable<any[]> | any;
  doc:any;
  id: number;
  isfav: boolean;
  idu:number;
  user:User=this.tokenStorageService.getUser();
  
  retrieveResonse: any;
  base64Data: any;
  retrievedFile: any;
  
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  
  userid:any;
  
    constructor(private route: ActivatedRoute,private userService: UserServiceGestService, private gestionDocService: GestionDocService,private router: Router,private modalService: NgbModal, private tokenStorageService : TokenStorageService,    private sanitizer: DomSanitizer,
      ) { }
  
      ngOnInit() {
        myfile = JSON.parse(
          localStorage.getItem(this.tokenStorageService.getUser().id)
        );
      //  const user = this.tokenStorageService.getUser();
        this.userid = this.user.id;
      console.log( this.user, this.userid,myfile,'hh');
        this.reloadData();
  
  /*
        this.reloadData();
        this.idu=this.tokenStorageService.getId();
        this.user=this.tokenStorageService.getUser();
      console.log(this.idu , this.user);*/
      this.roles = this.tokenStorageService.getUser().roles;
      console.log(this.roles);
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    } 
  
      reloadData() {
      //  this.documents = this.gestionDocService.getDocListFav(this.userid);
        this.documents=myfile;
      console.log(this.documents);

/*
        this.gestionDocService.getDoc(doc.id).subscribe((data) => {
        
          if(this.user.doc_favoris.indexOf(doc)==-1){
          myfile.push(doc);
          console.log("tpusha", myfile);
  
          localStorage.setItem(this.userid, JSON.stringify(myfile));
          console.log("done");}
        });
  
        this.userService.updateUser(this.user.id,this.user).subscribe(
          data => {
            console.log(data, "updated");
          },
          error => {
            console.log(error);
          }
        );
        this.favorita(doc);
      }*/


      console.log(this.userid, "reload" , this.documents);}
  
      tofav(idd:any){
        this.gestionDocService.AddToFav(this.userid,idd).subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
        console.log(this.userid , idd , 'hna');
        this.isfav=true;
  
      }
  
       /* fromfav(idd:number){
      this.gestionDocService.RemoveFromFav(this.userid,idd).subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
        this.isfav=false;*/
        fromfav(doc:any){
            const index: number = myfile.indexOf(doc);
            if (index != -1){
              //this.user.doc_favoris.splice(index,1);
              myfile.splice(index,1);
             localStorage.removeItem(JSON.stringify(myfile[index]));
             localStorage.setItem(this.userid, JSON.stringify(myfile));

            }
            this.userService.updateUser(this.user.id,this.user).subscribe(
              data => {
                console.log(data);
              },
              error => {
                console.log(error);
              }
            );
            this.favorita(doc);
            console.log(myfile);
      }

      i:number;

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
          this.id=id;
        }, error => console.log(error));
  
        this.modalService.open(contente, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
          this.closeResult = `Closed with: ${result}`;  
          if (result === 'yes') {  
            this.updateDoc();  
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
      
      updateDoc() {
        this.gestionDocService.updateDoc(this.id, this.doc).subscribe(
          data => {
            console.log(data);
            this.doc = new Document();
              this.reloadData(); }, 
          error => console.log(error));
      }
    
      retour(){
        this.router.navigate(['doc-view']);
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
  
  
  
  
   
  titre:any; 
  
  Search(){
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
   }
  }
  //}