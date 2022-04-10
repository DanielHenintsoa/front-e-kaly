import { PanierProduit } from "../models/panier-produit.model";

export class AddPanierProduit {
    static readonly type  = '[Panier] Add';
    constructor(public payload: any){}
}

export class UpdatePanierProduit {
    static readonly type  = '[Panier] Update';
    constructor(public payload: any){}
}
export class RemovePanierProduit {
    static readonly type  = '[Panier] Remove';
    constructor(public payload: string){}
}

export class ResetPanier {
    static readonly type  = '[Panier] Reset';
}

