import React from 'react';

function ProteinSelector({ protein, setProtein, proteinList }) {
  return (
    <fieldset className="col-md-12">
      <label htmlFor="protein" className="form-label">Välj proteins</label>
      <select
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        className="form-select" id="protein">
        {proteinList.map((proteinOption) => (
          <option key={proteinOption} value={proteinOption}>
            {proteinOption}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default ProteinSelector;
