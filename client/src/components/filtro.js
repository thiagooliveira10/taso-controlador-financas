import React from 'react';

export default function Filtro({onFilter}) {

  const handleOnChange = (event) => {
    console.log('handleOnChange: '+event.target.value);
    onFilter(event.target.value.toLowerCase());
  }


  return (
    <div className="col s9">
        <input id="busca" type="text" onChange={handleOnChange} />
    </div>
)
}