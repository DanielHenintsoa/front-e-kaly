import { LivreurCommandesComponent } from './pages/livreur/livreur-commandes/livreur-commandes.component';
import { EKalyCommandesComponent } from './pages/e-kaly/e-kaly-commandes/e-kaly-commandes.component';
import { RestoCommandesComponent } from './pages/resto/resto-commandes/resto-commandes.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { AuthGuard } from './shared/auth.guard';
import { ErrorComponent } from './pages/error/error.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';

const routes: Routes = [
  {path : "", component : LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path : "inscription", component : InscriptionComponent, canActivate: [SecureInnerPagesGuard]},
  {path : "accueil", component : AccueilComponent, canActivate: [AuthGuard],},
  {path : "resto/plats", component : AccueilComponent, canActivate: [AuthGuard],},
  {path : "resto/commandes", component : RestoCommandesComponent, canActivate: [AuthGuard],},
  {path : "e-kaly/commandes", component : EKalyCommandesComponent, canActivate: [AuthGuard],},
  {path : "livreur/commandes", component : LivreurCommandesComponent, canActivate: [AuthGuard],},
  {path : "commandes", component : CommandesComponent, canActivate: [AuthGuard],},
  {path : "**", component : ErrorComponent,  canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
