import { SetIsSimpleLoader } from './../../states/actions/user.actions';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { EKalyState } from './../../states/state/e-kaly.state';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddPanierProduit, RemovePanierProduit } from 'src/app/states/actions/panier.actions';
import { Observable } from 'rxjs';
import { PanierProduit } from 'src/app/states/models/panier-produit.model';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  plats : Array<any>;
  private plats_init : Array<any>; 
  restos : Array<any>;
  filtreResto : Array<string>;
  recherche:string;

  constructor(private store: Store, private service : EKalyService) {
    this.initResto();
    this.initPlats();
  }

  initPlats(){
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.getPlats().subscribe(response => {
      this.plats = response;
      this.plats_init = response;
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  initResto(){
    this.filtreResto = [];
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.getRestos().subscribe(response => {
      this.restos = response;
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }
  

  ngOnInit(): void {

  }

  rechercher(){
    if(!this.recherche){
      return;
    }
    this.filtreResto = []
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.rechercher(this.recherche).subscribe(response => {
      this.plats = response;
      this.plats_init = response;
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  clear(){
    this.recherche = "";
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.getPlats().subscribe(response => {
      this.plats = response;
      this.plats_init = response;
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  filtrer(id:string, event:any){
    if(event.target.checked){
      this.filtreResto.push(id);
    } else {
      this.filtreResto = this.filtreResto.filter( value => value != id);
    }
    if(this.filtreResto.length > 0){
      let liste = this.plats_init;
      if(this.recherche){
        liste = this.plats;
      }
      this.plats = liste.filter((pl)=> this.filtreResto.includes(pl.idResto));
    } else {
      this.plats = this.plats_init;
    }
    console.log(this.filtreResto);
  }
}
