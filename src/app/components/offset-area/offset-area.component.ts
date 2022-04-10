import { Router } from '@angular/router';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { SetIsSimpleLoader } from './../../states/actions/user.actions';
import { UpdatePanierProduit, ResetPanier } from './../../states/actions/panier.actions';
import { Component, OnInit } from '@angular/core';
import { EKalyState } from './../../states/state/e-kaly.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemovePanierProduit } from 'src/app/states/actions/panier.actions';
@Component({
  selector: 'app-offset-area',
  templateUrl: './offset-area.component.html',
  styleUrls: ['./offset-area.component.scss']
})
export class OffsetAreaComponent implements OnInit {
  _isLogged$ : Observable<boolean>;
  private _isLogged : boolean = false;
  panier$ : Observable<Array<any>>;
  panier : Array<any>;
  totalPrix = 0;
  rooter: Router;

  constructor(private store : Store, private service : EKalyService, rooter: Router) {
    this.rooter = rooter;
    this._isLogged$ = this.store.select(EKalyState.isLogged);
    this._isLogged$.subscribe((isLogged) => {
      this._isLogged = isLogged;
    });

    this.panier$ = this.store.select(EKalyState.getPanier);
    this.panier$.subscribe((panier) => {
      this.panier = panier;
      this.totalPrix = 0;
      this.panier.map((plat)=> {
        this.totalPrix += (plat.nombre * plat.pu);
      })
    });
  }

  removeFromPanier(plat:any){
    this.store.dispatch(new RemovePanierProduit(plat._id));
  }

  updatePlatPanier(plat:any){
    const nombre = document.getElementById('nombre-'+plat._id) as any;
    if(!isNaN(nombre.value) && nombre.value > 0){
      const updatedPlat = {...plat};
      updatedPlat.nombre = nombre.value;
      this.store.dispatch(new UpdatePanierProduit(updatedPlat));
    }else{
      nombre.value = plat.nombre;
    }
  }
  
  validerPanier(){
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user  = this.store.selectSnapshot(EKalyState.getUser);
    this.service.validerPanier(this.panier, user._id).subscribe( resSucess => {
      this.store.dispatch(new SetIsSimpleLoader(false));
      this.store.dispatch(new ResetPanier());
      this.rooter.navigate(["commandes"]);
    }, resError => {
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  ngOnInit(): void {

  }

  get isLogged(){
    return this._isLogged;
  }
}
