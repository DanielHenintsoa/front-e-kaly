import { PanierProduit } from "../models/panier-produit.model";

export class AddPanierProduit {
    static readonly type  = '[Panier] Add';
    constructor(public payload: PanierProduit){}
}

export class RemovePanierProduit {
    static readonly type  = '[Panier] Remove';
    constructor(public payload: string){}
}