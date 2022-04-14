import React , { useState } from "react";

export const ContextApi = React.createContext({
    Transactions : [],
    deleteTransactionHandler : () => {},
    addNewTransactionHandler : () => {},
});

export const ContextApiProvider = (props) => {
    const TransactionsInitalState = [
        { id: 1, text: 'Flower', amount: -20 },
        { id: 2, text: 'Salary', amount: 300 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: 150 }
    ];

    const [TransactionsList , setTransactionsList] = useState(TransactionsInitalState);
    
    const deleteTransactionHandler = (id) => {
        setTransactionsList((prevstate => {
            return prevstate.filter((value) => {
                return value.id !== id;
            })
        }))
    };

    const addNewTransactionHandler = (newTransaction) => {
        setTransactionsList((prevstate => {
            return [ ...prevstate , newTransaction ];  
        }))
    };

    return (
        <ContextApi.Provider value={{
            Transactions : TransactionsList,
            deleteTransactionHandler : deleteTransactionHandler,
            addNewTransactionHandler : addNewTransactionHandler
        }}>{props.children}</ContextApi.Provider>
    );
}