import { Component, OnInit } from '@angular/core';
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

  users: Observable<User[]>;

  constructor(private userServiceGestService: UserServiceGestService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userServiceGestService.getUserList();
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

  userDetails(id: number){
    this.router.navigate(['user-details', id]);
  }

  updateUser(id: number){
    this.router.navigate(['user-update', id]);
  }

}
