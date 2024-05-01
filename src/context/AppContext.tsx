import React, { createContext, useContext Dispatch, useState, ReactNode } from 'react';

interface AppState {
    tasks: any[] | null;
}

// Crie o contexto API
const AppContext = createContext({} as AppState);

// Crie o provedor de contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    return (
        <AppContext.Provider value={{ tasks }}>
            {children}
        </AppContext.Provider>
    );
};


// Crie um hook personalizado para acessar o estado global e a função de despacho
export const useAppContext = () => useContext(AppContext);