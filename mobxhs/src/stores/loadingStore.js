import {makeAutoObservable} from "mobx";

export default class LoadingStore {
    constructor() {
        this._isLoadingStarted = false;
        this._isLoading = false;
        this._data = null;
        makeAutoObservable(this)
    }

    setIsLoadingStarted(state) {
        this._isLoadingStarted = state;
    }

    get isLoadingStarted() {
        return this._isLoadingStarted;
    }

    setIsLoading(state) {
        this._isLoading = state;
    }

    get isLoading() {
        return this._isLoading;
    }

    setData(data) {
        this._isLoading = false
        this._data = data;
    }

    get data() {
        return this._data;
    }
}