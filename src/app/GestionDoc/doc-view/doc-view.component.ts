import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Observable } from 'rxjs';
import { GestionDocService } from '../gestion-doc.service';

@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss']
})
export class DocViewComponent implements OnInit {
/*
 viewer = 'google';  
  selectedType = 'docx';   
  DemoDoc="http://www.africau.edu/images/default/sample.pdf"
*/

p: number = 1;
count: number = 15;
searchText;
closeResult: string;  
documents: Observable<any[]>;
doc:any;
id: number;
isfav=false;

  constructor(private route: ActivatedRoute, private gestionDocService: GestionDocService,private router: Router,private modalService: NgbModal) { }

    ngOnInit() {this.reloadData();}

    reloadData() {
      this.documents = this.gestionDocService.getDocList();
    console.log(this.documents);}

    fav(id:number){
      this.isfav=!this.isfav;
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
  
}
