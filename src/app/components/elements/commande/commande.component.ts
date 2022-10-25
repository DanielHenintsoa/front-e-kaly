import { SetIsSimpleLoader } from './../../../states/actions/user.actions';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { EKalyState } from 'src/app/states/state/e-kaly.state';
import { Store } from '@ngxs/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  @Input() commande:any;
  @Input() livreurs:any;
  daty:Date;
  totalPrix:number;
  livreurSelect:string;
  isResto = false;
  isAdmin = false;
  isLivreur = false;
  private _etatLib:any;
  private utilisateur :any;

  constructor(private store : Store, private service : EKalyService) {
    const user = this.store.selectSnapshot(EKalyState.getUser);
    this.isResto = user.idResto ? true : false;
    this.isAdmin = user.idProfil == "6241b44394736fed37e2fb28"; // admin
    this.isLivreur = user.idProfil == "6241b4f794736fed37e2fb2a"; // livreur
    this.utilisateur = user;
  }

  ngOnInit(): void {
    this.daty = new Date(this.commande.daty);
    this.totalPrix = 0;
    this.commande.filles.map((f:any)=>{
      this.totalPrix += (f.nombre * f.pu);
    });
    if(this.isAdmin){
      this.livreurSelect = this.commande.livreurs.length > 0 ? this.commande.livreurs[0]._id : this.livreurs[0]._id;
    }
  }

  validerRestoCommande() {
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.validerCommandeResto(this.commande._id).subscribe(response => {
      this.store.dispatch(new SetIsSimpleLoader(false));
      this.commande.etat = 11;
      this.envoyerEmail(true);
      console.log(response);
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  annulerRestoCommande(){
    
  }

  private envoyerEmail(isValide:boolean){
    try {
      this.service.sendMail(this.commande, isValide).subscribe(response => {
        console.log("OK Mail", response);
      }, (error)=>{
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  assignerLivreur(){
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.assignerLivreur(this.livreurSelect, this.commande._id).subscribe(response => {
      this.store.dispatch(new SetIsSimpleLoader(false));

      this.livreurs.map((l:any) => {
        if(l._id == this.livreurSelect){
          this.commande.livreurs = [];
          this.commande.livreurs.push(l);
        }
      });
      console.log(response);
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
  }

  livrerCommande(){
    this.store.dispatch(new SetIsSimpleLoader(true));
    this.service.livrerCommande(this.commande._id).subscribe(response => {
      this.store.dispatch(new SetIsSimpleLoader(false));
      this.commande.etat = 21;
      console.log(response);
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    });
    
  }

  get etatLib() {
    this._etatLib = {};
    if(this.commande.etat == 0){
      this._etatLib.text = "Annulé pour manque de produits";
      this._etatLib.classe = "danger";
    }
    if(this.commande.etat == 1){
      this._etatLib.text = "En Cours";
      this._etatLib.classe = "primary";
    }
    if(this.commande.etat == 11){
      this._etatLib.text = "Validé";
      this._etatLib.classe = "success";
    }
    if(this.commande.etat == 21){
      this._etatLib.text = "Livré";
      this._etatLib.classe = "info";
    }
    return this._etatLib;
  }
}
