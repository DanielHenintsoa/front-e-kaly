import { SetIsSimpleLoader } from './../../states/actions/user.actions';
import GLOBAL_CONFIG from 'src/app/config/globale.config';
import { EKalyService } from './../../services/e-kaly.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EKalyState } from './../../states/state/e-kaly.state';
import { Store } from '@ngxs/store';
import { SetIsLogged, SetUser } from 'src/app/states/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitClicked = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    mdp: new FormControl('')
  });
  error : string
  isLogged: boolean;

  private rooter : Router;
  constructor(
    private formBuilder: FormBuilder,
    private service : EKalyService,
    rooter: Router,
    private store: Store) {
      this.rooter = rooter;
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,17}$")] ],
      mdp : ['',Validators.required]
    });
  }
  
  get l() { return this.loginForm.controls; }

  login(){
    this.submitClicked = true;
    if(this.loginForm.invalid){
      return;
    }
    this.processForm();
  }

  processForm(){
      const email = this.loginForm.controls['email'].value;
      const mdp = this.loginForm.controls['mdp'].value;
      this.store.dispatch(new SetIsSimpleLoader(true));
      this.service.login(email, mdp).subscribe( resSucess => {
        this.error = "";
        this.store.dispatch(new SetIsLogged(true));
        resSucess.profil = resSucess.profil[0];
        localStorage.setItem(GLOBAL_CONFIG.Data.user, JSON.stringify(resSucess));
        this.store.dispatch(new SetIsLogged(true));
        this.store.dispatch(new SetUser(resSucess));
        this.store.dispatch(new SetIsSimpleLoader(false));
        this.rooter.navigate([resSucess.menu[0].lien]);
      }, resError =>{
        this.store.dispatch(new SetIsSimpleLoader(false));
        if(resError.error.message){
          this.error = resError.error.message;
        }else {
          this.error = "Une erreur est survenue !";
        }
      });
  }
}
