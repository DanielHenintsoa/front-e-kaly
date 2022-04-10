import { EKalyState } from 'src/app/states/state/e-kaly.state';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  private _isSimpleLoader$ : Observable<boolean>;
  private _isSimpleLoader : boolean = false;

  constructor(private store : Store) {
    this._isSimpleLoader$ = this.store.select(EKalyState.isSimpleLoader);
    this._isSimpleLoader$.subscribe((isSimpleLoader) => {
      this._isSimpleLoader = isSimpleLoader;
    });
  }

  ngOnInit(): void {

  }

  get isSimpleLoader(){
    return this._isSimpleLoader;
  }

}
