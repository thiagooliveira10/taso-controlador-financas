import React, { useState, useEffect } from 'react';
import { getAllPeriods } from '../api/apiService.js'
import Periods from './periods'

export default function FormPeriod({onChangePeriod, value}){

  const [periods, setPeriods] = useState([]); 
  const [ periodSelected, setPeriodSelected ] = useState({value});
  const [firstButtonDisable, setFirstButtonDisable] = useState(false);
  const [lastButtonDisable, setLastButtonDisable] = useState(false);


  useEffect(() => {
    const fetchPeriods = async () => {            
        const data = await getAllPeriods();
        setPeriods(data);
    }

    if (periods !== [])
        fetchPeriods();        

  }, []);

  const handlePeriodChange = async (periodNew) =>{
    const idx = periods.indexOf(periodNew);
    setPeriodSelected(periodNew);
   
    setFirstButtonDisable(idx === 0);
    setLastButtonDisable(idx >= (periods.length - 1));
    
    onChangePeriod(periodNew);
  }

  const handleFirstClick = () => {
    const idx = periods.indexOf(periodSelected);

    select(idx - 1);
  }

  const handleLastClick = () => {
      const idx = periods.indexOf(periodSelected);

      select(idx + 1);
  }

  const select = (idx) => {
      const period = periods[idx];
      handlePeriodChange(period);
  }

  return (
    <div className="container">
        <div className="row" style={styles.centered}>Controle Financeiro Pessoal</div>
        <div style={styles.centered}>
            <div className="col">
                <button className="btn waves-effect waves-light" onClick={handleFirstClick} disabled={firstButtonDisable}>
                    <i className="material-icons">keyboard_arrow_left</i>
                </button>
            </div>
            <Periods periods={periods} defaultPeriod={periodSelected} onChangePeriod={handlePeriodChange}></Periods>
            <div className="col">
                <button className="btn waves-effect waves-light" onClick={handleLastClick} disabled={lastButtonDisable}>
                    <i className="material-icons">keyboard_arrow_right</i>
                </button>
            </div>
        </div>
    </div>
  )
}

const styles = {
  centered: {
      textAlign: 'center',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center'
  }
}