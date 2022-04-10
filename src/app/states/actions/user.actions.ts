export class SetIsSimpleLoader {
    static readonly type  = '[Loader] Set';
    constructor(public payload: boolean){}
}

export class SetIsLogged {
    static readonly type  = '[Logged] Set';
    constructor(public payload: boolean){}
}

export class SetUser {
    static readonly type  = '[User] Set';
    constructor(public payload: any){}
}

export class ResetAppState {
    static readonly type = '[AppState] Reset App State';
}