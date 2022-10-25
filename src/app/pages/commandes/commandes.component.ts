import { SetIsSimpleLoader } from './../../states/actions/user.actions';
import { Component, Input, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { EKalyState } from './../../states/state/e-kaly.state';
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  commandes : Array<any>;
  etats : Array<any>;
  checkboxEtat : Array<number>;

  private commandes_init : Array<any>; 

  constructor(private store : Store, private service : EKalyService) {
    this.checkboxEtat = [];
    this.etats = [
      {
        text : "Annulé",
        etat : 0
      },
      {
        text : "En Cours",
        etat : 1
      },
      {
        text : "Validé",
        etat : 11
      },
      {
        text : "Livré",
        etat : 21
      },
    ];
  }
  
  ngOnInit(): void {
    
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user = this.store.selectSnapshot(EKalyState.getUser);
    this.service.getClientCommandes(user._id).subscribe(response => {
      this.commandes = response;
      this.commandes_init = response;
      console.log(response);
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    }); 
  }

  filtrer(etat:number, event:any){
    if(event.target.checked){
      this.checkboxEtat.push(etat)
    } else {
      this.checkboxEtat = this.checkboxEtat.filter( value => value != etat);
    }
    if(this.checkboxEtat.length > 0){
      this.commandes = this.commandes_init.filter((c)=> this.checkboxEtat.includes(c.etat));
    } else {
      this.commandes = this.commandes_init;
    }
  }
}
