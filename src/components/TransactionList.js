import { useContext } from "react";
import { ContextApi } from "../store/contextApi";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { Transactions } = useContext(ContextApi);
  console.log(Transactions);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {Transactions &&
          Transactions.map((value) => {
            return (
              <Transaction
                key={value.id}
                id={value.id}
                text={value.text}
                amount={value.amount}
              />
            );
          })}
      </ul>
    </>
  );
};

export default TransactionList;
