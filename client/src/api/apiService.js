import axios from 'axios';

const API_URL='/api/transaction';

async function getTransactions(yearMonth){
  const result = await axios.get(API_URL+`?period=${yearMonth}`);
  const transactions = result.data.map((t) => {
    const {description} = t;
    return {
      ...t,
      descriptionLower: description.toLowerCase()
    }
  }); 

  transactions.sort((t1, t2) => t1.day -  t2.day);

  return transactions;
}

async function getAllPeriods(){
  const res = await axios.get(API_URL+'/periods');

  return res.data;
}

async function insertTransaction(transaction){
  const response = await axios.post(API_URL, transaction);
  return response.data;
}

async function updateTransaction(transaction){
  const response = await axios.put(API_URL+`?id=${transaction._id}`, transaction);
  return response.data;
}

async function deleteTransaction(transaction){
  const response = await axios.delete(API_URL+`/${transaction._id}`);
  return response.data;
}

export {getTransactions, insertTransaction, updateTransaction, deleteTransaction, getAllPeriods}