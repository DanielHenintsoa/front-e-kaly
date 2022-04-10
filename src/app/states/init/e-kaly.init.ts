import GLOBAL_CONFIG from "src/app/config/globale.config";

export class EKalyStateInit {
    static getIsLogged(){
        const userJson  = localStorage.getItem(GLOBAL_CONFIG.Data.user);
        return !!userJson;
    }
    
    static getPanier(){
        const panierJson  = localStorage.getItem(GLOBAL_CONFIG.Data.panier);
        if(!!panierJson){
            return JSON.parse(panierJson);
        }
        return [];
    }

    static getUserDetails(){
        const userJson  = localStorage.getItem(GLOBAL_CONFIG.Data.user);
        if(!!userJson){
          const user = JSON.parse(userJson);
          user.profil = user.profil[0];
          return user;
        }
        return {};
    }
}