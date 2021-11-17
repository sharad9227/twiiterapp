import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register';


const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path:'login', component:LoginComponent},
  { path:'home', component:HomeComponent}





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
