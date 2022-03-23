import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  closeResult: string;  
  id: number;
  user: User;
  users: Observable<User[]>;

  constructor(private route: ActivatedRoute,private router: Router,
    private userServiceGestService: UserServiceGestService,private modalService: NgbModal) { }

  ngOnInit() {
    this.reloadData();
   this.user = new User();

    this.id = this.route.snapshot.params['id'];
    
    this.userServiceGestService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }
  reloadData() {
    this.users = this.userServiceGestService.getUserList();}

  updateUser() {
    this.userServiceGestService.updateUser(this.id, this.user).subscribe(
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
