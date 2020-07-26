import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

export default function ModalForm({ onCloseModal, onSave, transaction }){

    const [ transactionEdit, setTransactionEdit ] = useState(null)
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isValid, setIsValid ] = useState(false);

    useEffect(() => {
        if(transaction !== null ){
            setTransactionEdit(transaction);
            setIsEdit(true);
            return;
        }

        const dt = new Date();
        const day = ("0" + (dt.getDate())).slice(-2);
        const month = ("0" + (dt.getMonth() + 1)).slice(-2);

        const t = {
            value: 0,
            category: '',
            description: '',
            year: dt.getFullYear(),
            month: +month,
            day: +day,
            yearMonth: `${dt.getFullYear()}-${month}`,
            yearMonthDay: `${dt.getFullYear()}-${month}-${day}`,
            type: "-",
        };

        setTransactionEdit(t);

    },[]);

    const handleClose = () => {
        onCloseModal();
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setTransactionEdit({ ...transactionEdit, [name]: value });
        validar();
    }

    const handleDateChange = (event) => {

    }

    const handleClickSave = () => {
        if(!isValid) return;
        onSave(transactionEdit, isEdit);
    }

    const validar = () =>{
        const t = transactionEdit;
    
        const valido = t.description !== null &&
                   t.description !== '' &&
                   t.category !== null &&
                   t.category !== '' &&
                   t.value > 0;
    
    setIsValid(valido);
}


    return (
        <div>
            <Modal isOpen={true} style={customStyles}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>{transactionEdit === null ? 'Incluir' : 'Editar'} Transação</span>
                    <button className="waves-effect waves-lights btn red dark-4"
                        onClick={handleClose}>
                        X
                    </button>
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>
                            <input name="type" type="radio"
                                disabled={isEdit}
                                defaultChecked={transactionEdit != null && transactionEdit.type === '-'}
                                onChange={handleInputChange}
                                value="-" />
                            <span>Despesa</span>
                        </label>
                    </div>
                    <div className="col s6">
                        <label>
                            <input name="type" type="radio"
                                disabled={isEdit}
                                defaultChecked={transactionEdit != null && transactionEdit.type === '+'}
                                onChange={handleInputChange} 
                                value = "+" />
                            <span>Receita</span>
                        </label>
                    </div>
                    <div className="input-field col s12">
                        <input 
                            placeholder="Informe uma descrição" 
                            id="description" 
                            name="description" 
                            type="text" 
                            className="validate" 
                            defaultValue={transactionEdit != null && transactionEdit.description} 
                            onChange={handleInputChange} />
                        <label htmlFor="description" className="active">Descrição</label>
                    </div>
                    <div className="input-field col s12">
                        <input 
                            placeholder="Informe uma categoria" 
                            id="category" 
                            name="category" 
                            type="text" 
                            className="validate"
                            defaultValue={transactionEdit != null && transactionEdit.category} 
                            onChange={handleInputChange} />
                        <label htmlFor="category" className="active">Categoria</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="value" 
                            name="value" 
                            type="number" 
                            step=".01" 
                            min= "0"
                            className="validate" 
                            defaultValue={transactionEdit != null && transactionEdit.value} 
                            onChange={handleInputChange} />
                        <label htmlFor="value" className="active">Valor</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="date" 
                            name="date" 
                            type="date" 
                            className="validate" 
                            defaultValue={transactionEdit != null && transactionEdit.yearMonthDay} 
                            onChange={handleDateChange} />
                        <label htmlFor="date" className="active">Data</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn waves-effect waves-light" disabled={!isValid} onClick={handleClickSave}>
                        Salvar
                    </button>
                </div>
                <div>

                </div>
            </Modal>
        </div>
)

}

const styles = {
  flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px'
  },
  title: {
      fontSize: '1.3rem',
      fontWeight: 'bold'
  },
  erroMessage: {
      color: 'red',
      fontWeight: 'bold'
  },
}

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
  },
  overlay: { zIndex: 1000 }
};