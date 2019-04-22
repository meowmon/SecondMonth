import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search = new FormControl();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  Search(){
    console.log("clicked")
  }
}
