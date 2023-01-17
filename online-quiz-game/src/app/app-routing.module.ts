import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/quiz-game/sign-in',
    pathMatch:'full'
  },
  {
    path:'quiz-game',
    loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
