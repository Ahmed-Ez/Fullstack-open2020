import React from 'react';

const Form = ({ formHandler, inputHandler, name, phone }) => {
  return (
    <div>
      <h3>Add New Number</h3>
      <form onSubmit={formHandler}>
        <div>
          Name: <input name="NewName" onChange={inputHandler} value={name} />
        </div>
        <div>
          Phone: <input name="NewPhone" onChange={inputHandler} value={phone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
