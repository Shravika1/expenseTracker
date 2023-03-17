import axios from 'axios';
import React, { useState,useEffect } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard';
import { useNavigate } from 'react-router-dom';
import './Transaction.css';
function Transaction() {
    const navigate = useNavigate();
    const [transactions,setTransactions] = useState([]);
    const[title,setTitle] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');

    const [filterOptions,setFilterOptions] = useState({
        price:0,
        beforeDate:'',
        afterDate:'',
        currentDate:''
    });

    async function getTransactions(){
        try{
            const data = await axios.get('http://localhost:5000/transactions',{
                headers:{
                    'authorization':`Bearer ${localStorage.getItem("token")}`
                }
            });
            setTransactions(data.data);
        }
        catch(e){
            if(e.response.status===403){
                navigate("/login");
            }
            else{
                alert("Error fetching the transactions");
            }
        }
    }

    useEffect(() => {
      if(localStorage.getItem("token")===undefined){
            navigate("/");
      }
      else{
        getTransactions();
      }
    }, [])

    const addTransaction = (e)=>{
        e.preventDefault();
        const transactionData = {
            title:title,
            price:price,
            description:description
        }

        const headerConfg = {
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }

        axios.post("http://localhost:5000/addNewTransaction",transactionData,headerConfg)
        .then((data)=>{
            console.log("added the transactions");
            getTransactions();
    
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function deleteTransaction(id){
        const requestConfig = {
            headers:{
                "authorization":`Bearer ${localStorage.getItem("token")}`,
                "Content-Type":"application/json"
            },
            data:{
                id:id
            }
        }
        
        axios.delete("http://localhost:5000/transaction",requestConfig)
        .then((data)=>{
            getTransactions();
        })
        .catch((err)=>{
            
            alert("err");
        })
    }

    function setfilterByOptions (e){
        
        if(e.target.name==="price"){
            setFilterOptions({...filterOptions,price:e.target.value});
        }
        if(e.target.name==="beforedate"&&(filterOptions.currentDate==='')){
            setFilterOptions({...filterOptions,beforeDate: e.target.value===''?'':new Date(e.target.value).toLocaleDateString().slice(0,10).replace(/-/g, '/')});
        }
        if(e.target.name==="afterdate"&&(filterOptions.currentDate==='')){
            setFilterOptions({...filterOptions,afterDate: e.target.value===''?'':new Date(e.target.value).toLocaleDateString().slice(0,10).replace(/-/g, '/')});
        }
        if(e.target.name==="currentdate"){
            const filterObj = {
                price : filterOptions.price ? filterOptions.price : undefined,
                currentDate:e.target.value===''?'':new Date(e.target.value).toLocaleDateString().slice(0,10).replace(/-/g, '/'),
                beforeDate: e.target.value===''? filterOptions.beforeDate: '',
                afterDate:e.target.value===''? filterOptions.afterDate: ''
            };
            setFilterOptions(filterObj);
        }
        
    }
    
    function filterByOptions(e){
        e.preventDefault();
        axios.post("http://localhost:5000/filterByoptions",filterOptions,{
            headers:{
                'authorization':`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((data)=>{
            setTransactions(data.data);
        })
        .catch((err)=>{
            alert("invalid filter");
        })
    }

  return (
    <div className='transactionspage' >
        <div className="transaction_container">
            <h1>Welcome</h1>
        </div>
        <form className='filter' onSubmit={filterByOptions}>
            <input className='inputfield' onChange={setfilterByOptions} name="price" type="number" placeholder='price' />

            <div className='filteroption' >
            <label htmlFor="beforedate">Before</label>
            <input className='inputfield' onChange={setfilterByOptions} name="beforedate" type="date" placeholder='before' />
            </div>
            <div className="filteroption">
            <label htmlFor="afterdate">After</label>
            <input className='inputfield' onChange={setfilterByOptions} name="afterdate" type="date" placeholder='after' />
            </div>
            
            <div className="filteroption">
            <label htmlFor="afterdate">currentDate</label>
            <input className='inputfield' onChange={setfilterByOptions} type="date" name="currentdate" placeholder='current date' />
            </div>
            

            <input className='filter_button' type="submit" value="filter" />
        </form>
        <div className="transactions">
        <form className='addTransaction' onSubmit={addTransaction} >  
            <input className='inputfield' onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='title' />
            <input className='inputfield' onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder='price' />
            <textarea onChange={(e)=>{setDescription(e.target.value)}} name="description" id="desc" cols="30" rows="10"></textarea>
            <input className='button' type="submit" value="add Transaction" />
        </form>
        {
            transactions.map((tx)=>{
                return(
                    <TransactionCard date={tx.date} title={tx.title} description={tx.description} price={tx.price} id={tx._id} deleteTransaction = {deleteTransaction} />
                )
            })
        }
        </div>
    </div>
  )
}

export default Transaction;