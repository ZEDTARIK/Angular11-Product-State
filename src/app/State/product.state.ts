export enum DataStateEnum {
    LOADING, // chargement PAge 
    LOADED, // get data from dataBase 
    ERROR // Error 
}

export interface AppDataState<T> {
    dataState?: DataStateEnum,
    data?: T,
    errorMessage?: string
}