import React , {useContext} from 'react';
import { ContextApi } from '../store/contextApi';

const Balance = () => {
  const { Transactions } = useContext(ContextApi);

  if(Transactions){
    const amount = Transactions.map((value) => {
      return value.amount;
    });
    
    var total = amount.reduce((sum, amount) => sum + amount,0).toFixed(2);
  }
  
  return (
    <React.Fragment>
      <h4>Your Balance</h4>
      <h1>&#x20b9; {total}</h1>
    </React.Fragment>
  )
}

export default Balance;
