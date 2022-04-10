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

  constructor(private store: Store, private service : EKalyService) {
    this.initPlats();
  }

  initPlats(){
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.getPlats().subscribe(response => {
      this.plats = response;
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  ngOnInit(): void {
  }

}
