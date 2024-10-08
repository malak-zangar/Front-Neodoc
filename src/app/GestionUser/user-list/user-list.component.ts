import { Component, EventEmitter, OnInit, Output } from '@angular/core';  
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { Observable } from "rxjs";
import { UserServiceGestService } from '../user-service-gest.service';
import { User } from "./../user";
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import {MatTableDataSource} from '@angular/material/table';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
  closeResult: string;  
  users: Observable<User[]>;
  p: number = 1;
  count: number = 7;
  searchText;
  isLoggedIn=false;
  constructor(private userServiceGestService: UserServiceGestService, private tokenStorageService : TokenStorageService,
    private router: Router,private modalService: NgbModal) {}

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      }
    this.reloadData();}

  reloadData() {
    this.users = this.userServiceGestService.getUserList();}

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

  deleteUser(id: number) {
    this.userServiceGestService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number){ this.router.navigate(['user-details', id]);}

  updateUser(id: number){this.router.navigate(['user-update', id]);}
}
