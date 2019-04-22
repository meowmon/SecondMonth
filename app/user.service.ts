import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userData } from './_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  loadData(){
    return this.http.get<userData>('http://192.188.88.104:8080/user/find1', {observe: 'response'});
  }
  loadUser(id : number){
    return this.http.get<userData>('http://192.188.88.104:8080/user/find1/'+id, {observe: 'response'});
  }
  addData(user: any){
    return this.http.post<userData>('http://192.188.88.104:8080/user/create1',{
      firstName: user.firstName,
      lastName: user.lastName,
      gender : user.gender,
      bday: user.bday,
      phone: user.contact.phone,
      gmail : user.contact.email,
      address : user.contact.address,
      country : user.region
  });
  }
  updateUser(id : number, user : any){
    return this.http.put<userData>('http://192.188.88.104:8080/user/find1/'+id, {
      id: id,
      firstName: user.firstName,  
      lastName: user.lastName,
      gender : user.gender,
      bday: user.bday,
      // phone: user.contact.phones,
      gmail : user.contact.email,
      address : user.contact.address,
      country : user.region
    })  
  }
  deleteUser(id : number){
    return this.http.delete('http://192.188.88.104:8080/user/delete2/'+id);
  }
}
