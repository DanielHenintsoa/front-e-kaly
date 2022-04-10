import { ResetAppState } from './../../states/actions/user.actions';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EKalyState } from './../../states/state/e-kaly.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetIsLogged, SetUser } from 'src/app/states/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  _isLogged$ : Observable<boolean>;
  panier$ : Observable<Array<any>>;
  private _isLogged : boolean = false;

  totalElement = 0;

  constructor(private store : Store, private router: Router) {
    this._isLogged$ = this.store.select(EKalyState.isLogged);
    this._isLogged$.subscribe((isLogged) => {
      this._isLogged = isLogged;
    });
    this.panier$ = this.store.select(EKalyState.getPanier);
    this.panier$.subscribe((panier) => {
      this.totalElement = panier.length;
    });
  }

  ngOnInit(): void {

  }

  deconnexion(){
    localStorage.clear();
    this.store.dispatch(new SetIsLogged(false));
    this.store.dispatch(new ResetAppState());
    this.router.navigate(['']);
  }

  get isLogged(){
    return this._isLogged;
  }
}
