import User from "../models/user";
import {makeAutoObservable} from "mobx";


export default class UserStore {

    constructor() {
        this.isAuth = false
        this.user = new User("123", "123")

        makeAutoObservable(this)
    }
}