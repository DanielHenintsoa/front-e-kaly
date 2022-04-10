import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EKalyState } from './../../states/state/e-kaly.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
