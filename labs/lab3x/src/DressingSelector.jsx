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
        onChange={(e) => setDressing(e.target.value)}
        className="form-select" >
        {dressingList.map((dressingOption) => (
          <option key={dressingOption} value={dressingOption}>
            {dressingOption}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default DressingSelector;
