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

  constructor(private store : Store, private service : EKalyService) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsSimpleLoader(true));
    const user = this.store.selectSnapshot(EKalyState.getUser);
    this.service.getClientCommandes(user._id).subscribe(response => {
      this.commandes = response;
      console.log(response);
      this.store.dispatch(new SetIsSimpleLoader(false));
    }, (error)=>{
      this.store.dispatch(new SetIsSimpleLoader(false));
    }); 
  }
}
