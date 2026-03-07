import { createContext } from 'react';
import CounterStore from './counterStore';

interface Store {
    counterStore: CounterStore
}

export const store: Store = {
    counterStore: new CounterStore()
}

export const StoreContext = createContext(store);