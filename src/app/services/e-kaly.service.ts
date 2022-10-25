import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GLOBAL_CONFIG from '../config/globale.config';

@Injectable({
  providedIn: 'root'
})
export class EKalyService {
  private api = "https://api-e-kaly.herokuapp.com/api";

  constructor(private http : HttpClient) { }

  getUserDetails(){
    const userJson  = localStorage.getItem(GLOBAL_CONFIG.Data.user);
    if(!!userJson){
      return JSON.parse(userJson);
    }
    return {};
  }

  getPlats() : Observable<any> {
    return this.http.get(this.api+"/plats");
  }

  getRestos() : Observable<any> {
    return this.http.get(this.api+"/restos");
  }

  rechercher(text:string) : Observable<any> {
    return this.http.get(this.api+"/client/rechercher?text="+text);
  }
  
  getClientCommandes(idUser:string) : Observable<any> {
    return this.http.get(`${this.api}/client/commandes?idUser=${idUser}`);
  }

  getRestoCommandes(idResto:string) : Observable<any> {
    return this.http.get(`${this.api}/resto/commandes?idResto=${idResto}`);
  }
  
  getEKalyCommandes() : Observable<any> {
    return this.http.get(`${this.api}/e-kaly/commandes`);
  }
  
  getLivreurCommandes(idLivreur:string) : Observable<any> {
    return this.http.get(`${this.api}/livreur/commandes?idLivreur=${idLivreur}`);
  }

  assignerLivreur(idLivreur:string, idCommande:string) : Observable<any>{
    return this.http.post(`${this.api}/e-kaly/assigner-livreur`, {
      idLivreur : idLivreur,
      idCommande : idCommande
    });
  }

  livrerCommande(idCommande:string) : Observable<any> {
    return this.http.post(`${this.api}/livreur/livrer`, {
      idCommande : idCommande
    });
  }

  validerCommandeResto(idCommande:string) : Observable<any> {
    return this.http.post(`${this.api}/resto/valider-commande`, {
      idCommande : idCommande
    });
  }

  login(email:string, mdp:string) : Observable<any>{
    return this.http.post(this.api+"/login", {
      email : email,
      mdp : mdp
    });
  }

  sendMail(commande:any, isValide:boolean) : Observable<any>{
    return this.http.post(this.api+"/sendMail", {
      commande : commande,
      isValide : isValide
    });
  }
  

  validerPanier(panier:Array<any>, idUser:string) : Observable<any> {
    return this.http.post(this.api+"/commander", {
      plats : panier,
      idUser : idUser
    });
  }
}
