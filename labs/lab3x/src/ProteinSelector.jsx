import React from 'react';
import { useId } from 'react';

function ProteinSelector({ protein, setProtein, proteinList }) {
  const id = useId();
  return (
    <fieldset className="col-md-12">
      <label htmlFor={id} className="form-label">Välj proteins</label>
      <select
        id={id}
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        className="form-select"
        required
        >
        <option value="">Gor ditt val</option>
        {proteinList.map((proteinOption) => (
          <option key={proteinOption} value={proteinOption}>
            {proteinOption}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">Du måste välja en bas</div>
    </fieldset>
  );
}

export default ProteinSelector;
