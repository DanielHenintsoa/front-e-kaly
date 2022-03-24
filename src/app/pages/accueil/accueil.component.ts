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
  panier$: Observable<PanierProduit[]>;
  
  constructor(private store: Store) {
    this.panier$ = this.store.select(state => state.panier.panier);
  }

  addPanier(nom:string, prix:string, nombre:string){
    this.store.dispatch(new AddPanierProduit({nom, prix, nombre}));
  }

  deleteProduit(nom:string){
    this.store.dispatch(new RemovePanierProduit(nom))
  }

  ngOnInit(): void {
  }

}
