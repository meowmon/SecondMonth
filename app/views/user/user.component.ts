import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { userData } from 'src/app/_model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users:any;
  chosenID: number;
  userName: string;
  display: boolean = false;
  array: number[]= [1,2,3,4,5,6,7]
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.loadData().subscribe(data => {
      this.users = data.body['data'];
      console.log(this.users)
    })
  }
  ngAfterContentInit(){
  }
  deleteUser(){
    this.userService.deleteUser(this.chosenID).subscribe();
    this.display=false;
    location.reload()
  }
  delete(id: number,i: number){
    this.userName =  this.users[i].firstName;
    this.display  = true;
    this.chosenID = id;
  }
  cancel(){
    this.display=false;
    this.chosenID = null;
  }
}
