import React , { useContext } from 'react';
import { ContextApi } from '../store/contextApi';

const IncomeExpenses = () => {
  const { Transactions } = useContext(ContextApi);

  if(Transactions){
    if(Transactions){
      const amount = Transactions.map(value => value.amount);
      var income = amount
                    .filter(amount => amount > 0)
                    .reduce((sum,amount) => sum + amount, 0)
                    .toFixed(2);
      var expense = amount
                    .filter(amount => amount < 0)
                    .reduce((sum,amount) => sum + amount, 0)*-1
                    .toFixed(2);
    }
  }

  return (
    <div className="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p className="money plus">{income}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p className="money minus">{expense}</p>
        </div>
    </div>      
  )
}

export default IncomeExpenses;