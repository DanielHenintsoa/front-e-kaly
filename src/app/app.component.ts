import { Component } from '@angular/core';
import GLOBAL_CONFIG from './config/globale.config';
import { EKalyState } from './states/state/e-kaly.state'; 
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'front-e-kaly';

  _isLogged$ : Observable<boolean>;
  private _isLogged : boolean = false;

  constructor(private store : Store) {
    this._isLogged$ = this.store.select(EKalyState.isLogged);
    this._isLogged$.subscribe((isLogged) => {
      this._isLogged = isLogged;
    });
  }

  ngOnInit(): void {

  }

  get isLogged(){
    return this._isLogged;
  }
}
