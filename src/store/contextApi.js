import React, { useEffect, useState } from "react";

export const ContextApi = React.createContext({
  Transactions: [],
  deleteTransactionHandler: () => {},
  addNewTransactionHandler: () => {},
});

export const ContextApiProvider = (props) => {
  const [TransactionsList, setTransactionsList] = useState();

  const fetchTransactionList = async () => {
    const response = await fetch(
      "https://react-expense-tracker-15a90-default-rtdb.firebaseio.com/Transactions.json"
    );
    const data = await response.json();

    const responsearr = [];
    for (const property in data) {
      responsearr.push({
        id: property,
        text: data[property].text,
        amount: data[property].amount,
      });
    }
    setTransactionsList(responsearr);
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const deleteTransactionHandler = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(
      `https://react-expense-tracker-15a90-default-rtdb.firebaseio.com/Transactions/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    setTransactionsList((prevstate) => {
      return TransactionsList.filter((data) => {
        return data.id !== id;
      });
    });
  };

  const addNewTransactionHandler = async (newTransaction) => {
    // eslint-disable-next-line
    const response = await fetch(
      "https://react-expense-tracker-15a90-default-rtdb.firebaseio.com/Transactions.json",
      {
        method: "POST",
        body: JSON.stringify(newTransaction),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTransactionsList((prevstate) => {
      return [...prevstate, newTransaction];
    });
  };

  return (
    <ContextApi.Provider
      value={{
        Transactions: TransactionsList,
        deleteTransactionHandler: deleteTransactionHandler,
        addNewTransactionHandler: addNewTransactionHandler,
      }}
    >
      {props.children}
    </ContextApi.Provider>
  );
};
