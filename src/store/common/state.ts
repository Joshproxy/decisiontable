
export interface IAsyncState {
    inProgress: boolean;
}

export interface IErrorState {
    errors: string[];
}

export interface IErrorableAsyncState extends IAsyncState, IErrorState {
    
}