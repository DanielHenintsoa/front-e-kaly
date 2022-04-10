import { Component, OnInit } from '@angular/core';
import { EKalyState } from './../../states/state/e-kaly.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  _isLogged$ : Observable<boolean>;
  user$ : Observable<any>;
  user : any;
  private _isLogged : boolean = false;

  constructor(private store : Store) {
    this._isLogged$ = this.store.select(EKalyState.isLogged);
    this._isLogged$.subscribe((isLogged) => {
      this._isLogged = isLogged;
    });
    this.user$ = this.store.select(EKalyState.getUser);
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    
  }

  get isLogged(){
    return this._isLogged;
  }
}
