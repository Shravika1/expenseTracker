import React from 'react';
import axios from 'axios';
import './TransactionCard.css';

function TransactionCard({title,price,date,description,id,deleteTransaction}) {
  
  return (
    <div className='trasactioncard' >
        <h1>{title}</h1>
        <h3>{price}</h3>
        <p>{`${date}`.slice(0,10)}</p>
        <p>{description}</p>
  
        <div className="transactioncardbuttons">
        <button  onClick={()=>{deleteTransaction(id)}} >delete</button>
        </div>
    </div>
  )
}

export default TransactionCard