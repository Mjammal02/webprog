import React from 'react';

function DressingSelector({ dressing, setDressing, dressingList }) {
  return (
    <fieldset className="col-md-12">
      <label htmlFor="dressing" className="form-label">Välj Dressing</label>
      <select
        value={dressing}
        onChange={(e) => setDressing(e.target.value)}
        className="form-select" id="dressing">
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
