import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guard/guard';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const routes: Routes = [
  {path:'', component: LoginComponent},

  {path:'mensajes', 
    component: MensajesComponent,
    canActivate: [ UsuarioGuard ] 
  },
  
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
