import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component'; 
import { RegisterComponent } from './user/register/register.component'; 
import { RoomComponent } from './room/room.component'; 
import { HomeComponent } from './home/home.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'room', component: RoomComponent },
  { path: 'home', component: HomeComponent },]; 

// const routes: Routes = [
//   {
//     path:'',
//     redirectTo:'/quiz-game/sign-in',
//     pathMatch:'full'
//   },
//   {
//     path:'quiz-game',
//     loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)
//   }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
