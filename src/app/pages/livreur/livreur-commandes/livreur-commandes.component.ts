import { EKalyState } from 'src/app/states/state/e-kaly.state';
import { SetIsSimpleLoader } from './../../../states/actions/user.actions';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-livreur-commandes',
  templateUrl: './livreur-commandes.component.html',
  styleUrls: ['./livreur-commandes.component.scss']
})
export class LivreurCommandesComponent implements OnInit {

  commandes : Array<any>;
  constructor(private store : Store, private service : EKalyService) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user = this.store.selectSnapshot(EKalyState.getUser);
    if(user.idProfil == "6241b4f794736fed37e2fb2a"){ // livreur
      this.service.getLivreurCommandes(user._id).subscribe(response => {
        this.commandes = response;
        this.store.dispatch(new SetIsSimpleLoader(false));
      }, (error)=>{
        this.store.dispatch(new SetIsSimpleLoader(false));
      });
    }
  }

}
