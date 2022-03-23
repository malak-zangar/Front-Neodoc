import { Component, EventEmitter, OnInit, Output } from '@angular/core';  
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { Router } from '@angular/router';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { filter } from 'rxjs/operators';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-enattente',
  templateUrl: './user-enattente.component.html',
  styleUrls: ['./user-enattente.component.scss']
})
export class UserEnattenteComponent implements OnInit {
  closeResult: string;  
  users: Observable<User[]>;
  p: number = 1;
  count: number = 5;
  searchText;

  constructor(private userServiceGestService: UserServiceGestService,
    private router: Router,private modalService: NgbModal) {}

  ngOnInit() {this.reloadData();}

  reloadData() {
    this.users = this.userServiceGestService.getUserListEnattente();}

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

  opene(contente, id) {  
    this.modalService.open(contente, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.acceptUser(id);  
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

  deleteUser(id: number) {
    this.userServiceGestService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  acceptUser(id: number) {
    this.userServiceGestService.acceptUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
