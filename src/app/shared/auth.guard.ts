import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { EKalyState } from '../states/state/e-kaly.state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLogged : boolean;

  constructor(public store: Store, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.isLogged = this.store.selectSnapshot<boolean>(EKalyState.isLogged);
    if (this.isLogged !== true) {
      this.router.navigate(['']);
    }
    return true;
  }
}
