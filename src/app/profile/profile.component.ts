import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceGestService } from '../GestionUser/user-service-gest.service';
import { User } from '../GestionUser/user';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  closeResult: string;  
  id: number;
  user: any;
  users: Observable<User[]>;
  role:string;
  showAdminBoard:boolean;
isLoggedIn=false;
  constructor(private route: ActivatedRoute,private router: Router,
    private userServiceGestService: UserServiceGestService,private modalService: NgbModal,private token: TokenStorageService) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      }
    this.currentUser = this.token.getUser();
    this.reloadData();
   this.user = new User();
    this.id=this.token.getId()
   this.userServiceGestService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
        for(let i=0;i<this.user.roles.length;i++){
          this.role=this.user.roles[i].name;
        }
        if (this.role=="ROLE_ADMIN"){
          this.showAdminBoard=true;
        }
        else this.showAdminBoard=false;
      }, error => console.log(error));
  }
  reloadData() {
    this.users = this.userServiceGestService.getUser(this.id);}

  updateUser() {
    this.userServiceGestService.updateUser(this.id, this.user).subscribe(
      data => {
        console.log(data);
       // this.user = new User();
        this.reloadData();
        alert('compte modifié avec succcés.'); 
      }, 
      error => console.log(error));
  }
 
  opene(contente) {  
    this.modalService.open(contente, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.updateUser();  
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


}
