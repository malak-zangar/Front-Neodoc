import { Component, EventEmitter, OnInit, Output } from '@angular/core';  
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { Observable } from "rxjs";
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  closeResult: string;  
  users: Observable<User[]>;

  constructor(private userServiceGestService: UserServiceGestService,
    private router: Router,private modalService: NgbModal) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userServiceGestService.getUserList();
  }

  open(content, id) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.deleteUser(id);  
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
  
  /*deleteHero(id) {  
    this.products = this.products.filter(x => x.id !== id);  
  }  */

  deleteUser(id: number) {
    this.userServiceGestService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number){
    this.router.navigate(['user-details', id]);
  }

  updateUser(id: number){
    this.router.navigate(['user-update', id]);
  }


}
