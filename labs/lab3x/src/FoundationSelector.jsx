import React from 'react';
import { useId } from 'react';

function FoundationSelector({ foundation, setFoundation, foundationList }) {
  const id = useId();
  return (
    <fieldset className="col-md-12">
      <label htmlFor={id} className="form-label">Välj Bas</label>
      <select
        id={id}
        value={foundation}
        onChange={(e) => setFoundation(e.target.value)}
        className="form-select"
      >
        {foundationList.map((foundationOption) => (
          <option key={foundationOption} value={foundationOption}>
            {foundationOption}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default FoundationSelector;
