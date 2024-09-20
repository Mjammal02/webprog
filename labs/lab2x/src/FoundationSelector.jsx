import React from 'react';

function FoundationSelector({ foundation, setFoundation, foundationList }) {
  return (
    <fieldset className="col-md-12">
      <label htmlFor="foundation" className="form-label">Välj bas</label>
      <select
        value={foundation}
        onChange={(e) => setFoundation(e.target.value)}
        className="form-select" id="foundation">
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
