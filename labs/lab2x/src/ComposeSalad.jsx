import { useState } from 'react';

function ComposeSalad(props) {

  // State for each salad component
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtras] = useState({});
  const [dressing, setDressing] = useState('');

  // Foundation, Protein, and Dressing Lists
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const extrasList  = Object.keys(props.inventory).filter(name => props.inventory[name].extras);


  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

         {/* Foundation Select */}
        <fieldset className="col-md-12">
          <label htmlFor="foundation" className="form-label">Välj bas</label>
          <select //Dropdown lista
            value={foundation} // Här binder vi värdet till 'foundation' från state
            onChange={(e)=> setFoundation(e.target.value)}   //EventHandler Uppdaterar state när valet ändras
            className="form-select" id="foundation">
            {foundationList.map((foundationOption)=>(// Map för att loopa igenom
            <option key={foundationOption} value={foundationOption}>
              {foundationOption}
              </option>))}
          </select>
        </fieldset>

          {/* Protein Select */}
        <fieldset className="col-md-12">
          <label htmlFor="protein" className="form-label">Välj Protein</label>
          <select //Dropdown lista
            value={protein} // Här binder vi värdet till 'foundation' från state
            onChange={(e)=> setProtein(e.target.value)}   //EventHandler Uppdaterar state när valet ändras
            className="form-select" id="foundation">
            {proteinList.map((proteinOption)=>(// Map för att loopa igenom
            <option key={proteinOption} value={proteinOption}>
              {proteinOption}
              </option>))}
          </select>
        </fieldset>

          {/* Extras Checkboxes */}
        <fieldset className="col-md-12">
          <label htmlFor="protein" className="form-label">Välj Tillbehör</label>
        </fieldset>

          {/* Dressing Select */}
        <fieldset className="col-md-12">
          <label htmlFor="dressing" className="form-label">Välj Dreessing</label>
          <select //Dropdown lista
            value={dressing} // Här binder vi värdet till 'foundation' från state
            onChange={(e)=> setDressing(e.target.value)}   //EventHandler Uppdaterar state när valet ändras
            className="form-select" id="dressing">
            {dressingList.map((dressingOption)=>(// Map för att loopa igenom
            <option key={dressingOption} value={dressingOption}>
              {dressingOption}
              </option>))}
          </select>
        </fieldset>

      </div>
    </div>
  );
}
export default ComposeSalad;