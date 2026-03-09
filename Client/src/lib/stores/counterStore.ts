import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    title = "Counter Store";
    count = 0;
    events: string[] = [
        `Initial count is ${this.count}`
    ]

    constructor() {
        // makeObservable(this, {
        //     title: observable, 
        //     count: observable,
        //     increment: action,
        //     decrement: action
        // }); 
        makeAutoObservable(this); // does same as the above but with less boiler plate
    }

    // arrow functions so they are automatically bound to the class as a class method
    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - count is now ${this.count}`);
    }
    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - count is now ${this.count}`);
    }

    get eventCount(){
        return this.events.length;
    }


}