import { SetIsSimpleLoader } from './../../../states/actions/user.actions';
import { EKalyService } from 'src/app/services/e-kaly.service';
import { EKalyState } from 'src/app/states/state/e-kaly.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-resto-commandes',
  templateUrl: './resto-commandes.component.html',
  styleUrls: ['./resto-commandes.component.scss']
})
export class RestoCommandesComponent implements OnInit {
  commandes : Array<any>;
  constructor(private store : Store, private service : EKalyService) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user = this.store.selectSnapshot(EKalyState.getUser);
    if(user.idResto){
      this.service.getRestoCommandes(user.idResto).subscribe(response => {
        this.commandes = response;
        this.store.dispatch(new SetIsSimpleLoader(false));
      }, (error)=>{
        this.store.dispatch(new SetIsSimpleLoader(false));
      });
    }
  }

}
