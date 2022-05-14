import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { updateRequest } from './updateRequest';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  closeResult: string;  
  id: number;
  user: any;
  nuser:updateRequest=new updateRequest();
  users: Observable<User[]>;
role:string;
usere:any;
form:any={role:null};
isLoggedIn=false;
  constructor(private route: ActivatedRoute,private router: Router,
    private userServiceGestService: UserServiceGestService,private modalService: NgbModal,private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      }
    this.reloadData();
   this.user = new User();

    this.id = this.route.snapshot.params['id'];
   this.usere=this.token.getUser();

    this.userServiceGestService.getUser(this.id)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
        for(var i=0;i<this.user.roles.length;i++){
          if(this.user.roles[i].name=='ROLE_USER'){
            this.role="user";
          }
          else if (this.user.roles[i].name=='ROLE_ADMIN'){
            this.role="admin";
          }
          this.form['role']=this.role;
          console.log(this.form['role']);
        }
      
      }, error => console.log(error));
  }
  reloadData() {
    this.users = this.userServiceGestService.getUserList();}

  updateUser() {
    this.nuser.firstname=this.user.firstname;
    this.nuser.lastname=this.user.lastname;
    this.nuser.username=this.user.username;
    this.nuser.email=this.user.email;
    this.nuser.poste=this.user.poste;

    this.nuser.role.push(this.form['role']);
    console.log(this.nuser.role);

    console.log(this.nuser);
    this.userServiceGestService.updateUser(this.id, this.nuser).subscribe(
      data => {
        console.log(data);
        this.user = new User();
        this.router.navigate(['user-details', this.id]);

      }, 
      error => console.log(error));
  }

  retour(){
    this.router.navigate(['user-details', this.id]);
  }

  open(content) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
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
