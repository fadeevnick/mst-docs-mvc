import React from 'react';
import TodoStore, { TodoStoreType } from './mst';

type StateContextValue = {
  todosStore: TodoStoreType
}

const StateContext = React.createContext<StateContextValue>({} as StateContextValue);

const todosStore = TodoStore.create({});

export const StateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <StateContext.Provider value={{ todosStore }}>
    {children}
  </StateContext.Provider>
}

export const useStore = () => React.useContext(StateContext);
