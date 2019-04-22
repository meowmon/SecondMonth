import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;
  userInfo: FormGroup;
  gender: string[] = ['Male','Female'];
  regions:any;
  user: any;
  userTel: string[];
  constructor( private fb : FormBuilder,private data: UserService, private route: ActivatedRoute,private router: Router) {
    this.loadName();
   }

  ngOnInit() {
    this.userInfo = this.fb.group({
      firstName:   ['',[Validators.required, Validators.minLength(3)]],
      lastName:    ['',[Validators.required, Validators.minLength(3)]],
      bday:        ['', Validators.required],
      gender:      [this.gender[0], Validators.required],
      contact: this.fb.group({
        phones: this.fb.array([ this.fb.control('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]) ]),
        email:  ['',[Validators.required,Validators.email]],
        address: ''
      }),
      region:      ['null',Validators.required]
    },Validators.required);
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id != 0){
      this.data.loadUser(this.id).subscribe(data => {
        this.user = data;
        console.log(this.user)
        // for(var _i=1; _i < Object.keys(this.user.body.phone).length ; _i++ ){
        //   this.addTel();
        // };
        console.log(this.getTels(this.user.body.data.phone)[0].value)
        for (let tel of this.getTels(this.user.body.data.phone)){
          // this.userTel.push(tel.value);
        }
        this.userInfo.patchValue({
          firstName : this.user.body.data.firstName,
          lastName : this.user.body.data.lastName,
          bday : this.user.body.data.bday,
          gender : this.user.body.data.gender,
          contact :{
            // phones : this.userTel,
            email : this.user.body.data.gmail,
            address : this.user.body.data.address
          },
          region : this.user.body.data.country
        })
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      })
      
    } else{
      // this.data.loadUser(this.id).subscribe(data)
    }
  }
  get phones(): FormArray {
    return this.userInfo.get('contact.phones') as FormArray;
  }
  
  addTel() {
    this.phones.push(this.fb.control(''));
  }
  
  removeTel(index: number) {
    this.phones.removeAt(index);
  }
  
  OnSubmit(){
    this.submitted = true;
    if(this.id != 0){
      this.data.updateUser(this.id, this.userInfo.value) .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured',err);
        })
    }else{
      this.data.addData(this.userInfo.value) .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        })
      }
    console.log(this.userInfo.value );
    console.log(this.id);
    this.router.navigate([""]);
  }
  getTels(allTel : string){
    var tels = allTel.split(/, +/g).map(function (tel){
      return{
        value : tel,
        display : tel
      };
    });
    return tels;
  }
  loadName() {
    var allRegion = 'America, Britain, China, Czech, England, Holland, Hong-kong, New-zealand, Puerto-rico, Slovak, South africa, South korea, South-africa, South-korea, Trinidad & Tobago, United-kingdom, United-states, Viet nam ';
    this.regions = allRegion.split(/, +/g).map(function (region) {
      return {
        value: region,
        display: region
      };
    });
  }
  @Input() id: number;
}

