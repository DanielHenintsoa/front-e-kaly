import { State, Action, StateContext, Selector } from "@ngxs/store";
import { PanierProduit } from "../models/panier-produit.model";
import { AddPanierProduit, RemovePanierProduit } from "../actions/panier.actions";

export class EKalyStateModel {
    panier: PanierProduit[];
}

@State<EKalyStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})

export class EKalyState {

    @Selector()
    static getPanier(state: EKalyStateModel) {
        return state.panier;
    }

    @Action(AddPanierProduit)
    add({getState, patchState} : StateContext<EKalyStateModel>, { payload } : AddPanierProduit){
        const state = getState();
        patchState({
            panier: [...state.panier, payload]
        })
    }

    @Action(RemovePanierProduit)
    remove({getState, patchState} : StateContext<EKalyStateModel>, { payload } : RemovePanierProduit){
        patchState({
            panier: getState().panier.filter(a => a.nom != payload)
        })
    }
}