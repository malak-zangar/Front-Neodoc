import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  background:string="../../assets/images/1527067820254.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
