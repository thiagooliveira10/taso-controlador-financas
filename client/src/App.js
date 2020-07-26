import React, { useState, useEffect } from 'react';
import * as api from './api/apiService.js';
import FormPeriod from './components/formPeriod.js';
import TransactionList from './components/transactionList.js';
import Resumo from './components/resumo.js';
import Filtro from './components/filtro.js';
import ModalForm from './components/modalForm.js';
import Spinner from './components/Spinner.js';
import ModalConfirmDelete from './components/ModalConfirmDelete.js';

export default function App() {

  const dt = new Date();

  const yearMonthCurrent = `${dt.getFullYear()}-${("0" + (dt.getMonth() + 1)).slice(-2)}`;

  const [ transactions, setTransactions ] = useState([]);
  const [ transactionsAll, setTransactionsAll ] = useState([]);
  const [ period, setPeriod ] = useState(yearMonthCurrent);
  const [ transactionSelected, setTransactionSelected] = useState({});
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen ] = useState(false);

  useEffect(() => {
    const getTransaction = async () => {
      const transactions = await api.getTransactions(period);
      setTransactions(transactions);
      setTransactionsAll(transactions);
    };

    getTransaction();
  }, [period]);

  const handleChangeYearMonth = async (pYearMonth) => {
    setPeriod(pYearMonth);
    const transactions = await api.getTransactions(pYearMonth);
    setTransactions(transactions);
    //console.log(transactions);
  }

  const handleSelectedEdit = (transactionEdit) =>{
    //console.log(transactionEdit);
    setTransactionSelected(transactionEdit);
    setIsModalOpen(true);
  }

  const handleSelectedDelete = (transactionDelete) =>{
    //console.log(transactionDelete);
    setTransactionSelected(transactionDelete);
    setIsModalDeleteOpen(true);
  }

  const handleNewLancamento = () => {
    isModalOpen(true);
    setTransactionSelected(null);
  }

  const handleFilter = async (queryText) => {

    if(queryText){
      console.log('query: '+queryText);
      const transactionsNew = transactionsAll.filter((t) => t.descriptionLower.includes(queryText));
      setTransactions(transactionsNew);
    }else{
      console.log('getAll');
      setTransactions(await api.getTransactions(period));
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
  }

  const handlePersistData = async (transactionPersist, isEdit) => {
    try{
      if(!isEdit){
        await api.insertTransaction(transactionPersist);
      }else{
        await api.updateTransaction(transactionPersist);
      }

      handleCloseModal();
      refresh();
    }catch(err){
      console.log('error: '+err);
    }
  }

  const refresh = () => {
    const p = period;
    setPeriod(null);
    setPeriod(p);
  }

  const handlePersistDelete = async (deletar) => {
    setIsModalDeleteOpen(false);
    
    if (deletar) {
      try {        
        await api.deleteTransaction(transactionSelected);
        refresh();
      } catch{
        console.log("Erro ao deletar");
      }
    }
  }

  return (
    <div className="container">
      <div style={styles.centeredTitle}>
        Bootcamp Desenvolvedor Fullstack - Desafio Final
      </div>
      <FormPeriod 
        value={period}
        onChangePeriod={handleChangeYearMonth}  
      /> 

      <Resumo period={period} transactions={transactions}></Resumo>

      <div className="row">
        <div className="col s3">
          <button className="btn waves-effect waves-light" onClick={handleNewLancamento}>
            + NOVO LANÇAMENTO
          </button>
        </div>
        <Filtro onFilter={handleFilter}></Filtro>
      </div>
      {transactions.length === 0 && <Spinner />}
      <TransactionList transactions={transactions} onDelete={handleSelectedDelete} onEdit={handleSelectedEdit}/>

      {isModalOpen &&
        <ModalForm
          onCloseModal={handleCloseModal}
          onSave={handlePersistData}
          transaction={transactionSelected}></ModalForm>}
      {isModalDeleteOpen &&
        <ModalConfirmDelete
          onDelete={handlePersistDelete} onClose={handleCloseModalDelete}></ModalConfirmDelete>}
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.4em',
    paddingTop: '20px'
  }
}
