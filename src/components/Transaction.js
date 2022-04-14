import React , {useContext} from 'react';
import { ContextApi } from '../store/contextApi';

const Transaction = (props) => {
    const context = useContext(ContextApi);
    const sign = props.amount < 0 ? '-' : '+' ;
    const deleteTransactionHandler = () => {
        context.deleteTransactionHandler(props.id);
    }

    return (
    <li className={props.amount < 0 ? "minus" : "plus"}>{props.text}<span>{sign}${Math.abs(props.amount)}</span><button onClick={deleteTransactionHandler} className="delete-btn">x</button></li>
    )
}

export default Transaction;
