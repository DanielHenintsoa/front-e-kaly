import { ResetAppState, SetIsSimpleLoader } from './../actions/user.actions';
import GLOBAL_CONFIG from 'src/app/config/globale.config';
import { UpdatePanierProduit, ResetPanier } from './../actions/panier.actions';
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { PanierProduit } from "../models/panier-produit.model";
import { AddPanierProduit, RemovePanierProduit } from "../actions/panier.actions";
import { SetIsLogged, SetUser } from "../actions/user.actions";
import { EKalyStateInit } from "../init/e-kaly.init";
import { patch, updateItem, insertItem, append} from '@ngxs/store/operators';
import { Observable } from 'rxjs';

export class EKalyStateModel {
    panier: Array<any>;
    isLogged : boolean;
    user : any;
    isSimpleLoader : boolean
}

@State<EKalyStateModel>({
    name: 'eKalyState',
    defaults: {
        panier: EKalyStateInit.getPanier(),
        isLogged : EKalyStateInit.getIsLogged(),
        user : EKalyStateInit.getUserDetails(),
        isSimpleLoader : false
    }
})

export class EKalyState {

    @Selector()
    static getPanier(state: EKalyStateModel) {
        return state.panier;
    }

    @Selector()
    static getUser(state: EKalyStateModel) {
        return state.user;
    }

    @Selector()
    static isSimpleLoader(state: EKalyStateModel) {
        return state.isSimpleLoader;
    }

    @Selector()
    static isLogged(state: EKalyStateModel) {
        return state.isLogged;
    }

    @Action(SetUser)
    setUser({getState, patchState} : StateContext<EKalyStateModel>, { payload } : SetUser){
        patchState({
            user: payload
        });
    }

    @Action(SetIsSimpleLoader)
    setIsSimpleLoader({getState, patchState} : StateContext<EKalyStateModel>, { payload } : SetIsSimpleLoader){
        patchState({
            isSimpleLoader: payload
        });
    }

    @Action(SetIsLogged)
    setIsLogged({getState, patchState} : StateContext<EKalyStateModel>, { payload } : SetIsLogged){
        patchState({
            isLogged: payload
        });
    }

    @Action(AddPanierProduit)
    add({getState, patchState} : StateContext<EKalyStateModel>, { payload } : AddPanierProduit){
        const state = getState();
        let indexPlat = state.panier.findIndex(a => a._id === payload._id);
        if(indexPlat >= 0 ){
            state.panier[indexPlat].nombre += payload.nombre; 
        }else{
            state.panier.push(payload);
        }
        const panierState = [...state.panier];
        this.updatePanierInStorage(panierState);
        patchState({
            panier: panierState
        })
    }

    @Action(UpdatePanierProduit)
    update({getState, patchState} : StateContext<EKalyStateModel>, { payload } : UpdatePanierProduit){
        const state = getState();
        let indexPlat = state.panier.findIndex(a => a._id === payload._id);
        if(indexPlat >= 0 ){
            state.panier[indexPlat].nombre = payload.nombre; 
        }else{
            state.panier.push(payload);
        }
        const panierState = [...state.panier];
        this.updatePanierInStorage(panierState);
        patchState({
            panier: panierState
        })
    }

    @Action(RemovePanierProduit)
    remove({getState, patchState} : StateContext<EKalyStateModel>, { payload } : RemovePanierProduit){
        const panierState = getState().panier.filter(a => a._id != payload);
        this.updatePanierInStorage(panierState);
        patchState({
            panier: panierState
        })
    }

    private updatePanierInStorage(panierState:Array<any>){
        localStorage.setItem(GLOBAL_CONFIG.Data.panier, JSON.stringify(panierState));
    }

    @Action(ResetAppState)
    resetState(ctx: StateContext<EKalyStateModel>) {
        const state = ctx.getState();
        state.panier = [];
        state.isLogged = false;
        state.user = {};
        ctx.setState(
            patch({...state})
        );
    }

    @Action(ResetPanier)
    resetPanier(ctx: StateContext<EKalyStateModel>) {
        const panierState = <any>[];
        this.updatePanierInStorage(panierState);
        ctx.patchState({
            panier: panierState
        })
    }
    
}