import { EKalyState } from 'src/app/states/state/e-kaly.state';
import { SetIsSimpleLoader } from './../../../states/actions/user.actions';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-e-kaly-commandes',
  templateUrl: './e-kaly-commandes.component.html',
  styleUrls: ['./e-kaly-commandes.component.scss']
})
export class EKalyCommandesComponent implements OnInit {

  commandes : Array<any>;
  livreurs : Array<any>;
  constructor(private store : Store, private service : EKalyService) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user = this.store.selectSnapshot(EKalyState.getUser);
    if(user.idProfil == "6241b44394736fed37e2fb28"){ // admin
      this.service.getEKalyCommandes().subscribe(response => {
        this.commandes = response.commandes;
        this.livreurs = response.livreurs;
        console.log(this.livreurs);
        this.store.dispatch(new SetIsSimpleLoader(false));
      }, (error)=>{
        this.store.dispatch(new SetIsSimpleLoader(false));
      });
    }
  }

}
