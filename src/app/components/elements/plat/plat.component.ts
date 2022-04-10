import { AddPanierProduit } from './../../../states/actions/panier.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { EKalyState } from 'src/app/states/state/e-kaly.state';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {
  cardClass:string;
  @Input() plat : any;
  nombre = 1;
  error = false;

  constructor(private store : Store) {
    this.cardClass = "col-12 col-sm-6 col-md-4";
  }

  ngOnInit(): void {

  }

  addPanier(){
    this.error = this.nombre < 1;
    if(this.error){
      return;
    }
    const newPlat = this.plat ;
    newPlat.nombre = this.nombre;
    this.store.dispatch(new AddPanierProduit({...newPlat}));
    this.nombre = 1;
    const btn = document.querySelector('.panier-button') as any;
    if(!!btn){
      const controlSidebar = document.querySelector('.control-sidebar') as any;
      if(controlSidebar.style.display == "none"){
        btn.click();
      }
    }
  }
}
