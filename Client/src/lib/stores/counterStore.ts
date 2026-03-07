import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    title = "Counter Store";
    count = 0;

    constructor() {
        // makeObservable(this, {
        //     title: observable, 
        //     count: observable,
        //     increment: action,
        //     decrement: action
        // }); 
        makeAutoObservable(this); // does same as the above but with less boiler plate
    }

    // arrow functio nso they are automatically bound to the class as a class method
    increment = (amount = 1) => {
        this.count += amount;
    }
    decrement = (amount = 1) => {
        this.count -= amount;
    }
}