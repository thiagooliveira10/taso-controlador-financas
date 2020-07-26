import React, { useState, useEffect } from 'react';
import * as api from '../api/apiService.js';

export default function Resumo({period, transactions}){

  const [receitaTotal, setReceitaTotal] = useState(0);
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    
    const receitas = transactions.reduce((acc, cur) => {
      if(cur.type === '+')
        return acc + cur.value;
      else
        return acc;
    },0);

    const despesas = transactions.reduce((acc, cur) => {
      if(cur.type === '-')
        return acc + cur.value;
      else
        return acc;
    },0);

    const saldo = receitas - despesas;

    setDespesaTotal(despesas);
    setReceitaTotal(receitas);
    setSaldoTotal(saldo);
  }, [period, transactions])

  return (
    <div style={styles.detalhes} className="row">
       <div className="row">
        <div className="col s3" style={{textAlign:'left'}}>
          Lançamentos: {transactions.length}
        </div>
        <div className="col s3" style={{textAlign:'center'}}>
            Receitas: <span style={{color:'rgb(70, 160, 151)'}}>R$ {receitaTotal}</span>
        </div>
        <div className="col s3" style={{textAlign:'center'}}>
            Despesas: <span style={{color:'rgb(187, 61, 47)'}}>R$ {despesaTotal}</span>
        </div>
        <div className="col s3" style={{textAlign:'right'}}>
            Saldo: <span style={{color: saldoTotal >= 0 ?'rgb(70, 160, 151)' : 'rgb(187, 61, 47)'}}>R$ {saldoTotal}</span>
        </div>

       </div>
    </div>
  );
}

const styles = {
  detalhes: {        
      paddingTop: '20px',
      border: '1px solid gray',
      borderRadius: '5px',
      fontWeight:'bold'
  }
}