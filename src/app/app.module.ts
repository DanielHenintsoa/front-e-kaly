import { EKalyService } from './services/e-kaly.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ErrorComponent } from './pages/error/error.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { EKalyState } from './states/state/e-kaly.state';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { OffsetAreaComponent } from './components/offset-area/offset-area.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PlatComponent } from './components/elements/plat/plat.component';
import { LoaderComponent } from './components/elements/loader/loader.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { CommandeComponent } from './components/elements/commande/commande.component';
import { RestoCommandesComponent } from './pages/resto/resto-commandes/resto-commandes.component';
import { EKalyCommandesComponent } from './pages/e-kaly/e-kaly-commandes/e-kaly-commandes.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InscriptionComponent,
    AccueilComponent,
    ErrorComponent,
    SidebarMenuComponent,
    OffsetAreaComponent,
    PlatComponent,
    LoaderComponent,
    CommandesComponent,
    CommandeComponent,
    RestoCommandesComponent,
    EKalyCommandesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      EKalyState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    EKalyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
