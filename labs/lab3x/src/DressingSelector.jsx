import React from 'react';
import { useId } from 'react';

function DressingSelector({ dressing, setDressing, dressingList }) {
  const id = useId();
  return (
    <fieldset className="col-md-12">
      <label htmlFor={id} className="form-label">Välj Dressing</label>
      <select
        id={id}
        value={dressing}
        onChange={setDressing}
        className="form-select" 
        required
        >
        <option value="">Gor ditt val</option>
        {dressingList.map((dressingOption) => (
          <option key={dressingOption} value={dressingOption}>
            {dressingOption}
          </option>
        ))}
      </select>
<<<<<<< HEAD
      <div className="invalid-feedback">Du måste välja en bas</div>
=======
      <div className="invalid-feedback">Du måste välja en dressing!</div>
>>>>>>> db373be38762bbac5c48ddb6e45f50dec0ff10da
    </fieldset>
  );
}

export default DressingSelector;
