import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { FormComponent } from './views/form/form.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'user?search=:serachItem', component: UserComponent},
  { path: 'newUser', component: FormComponent},
  { path: 'editUser/:id', component: FormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
