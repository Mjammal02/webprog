import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importera Bootstrap
import FoundationSelector from './FoundationSelector';
import ProteinSelector from './ProteinSelector';
import DressingSelector from './DressingSelector';


function ComposeSalad(props) {

  // Foundation, Protein, and Dressing Lists
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const extrasList  = Object.keys(props.inventory).filter(name => props.inventory[name].extra);

  // State for each salad component
  const [foundation, setFoundation] = useState(foundationList[0] || '');
  const [protein, setProtein] = useState(proteinList[0] || '');
  const [extras, setExtras] = useState({
    Bacon: true, 
    Fetaost: true
  });
  const [dressing, setDressing] = useState(dressingList[0] || '');

   // Handle extra checkbox changes
   const handleExtraChange = (e) => {
    const { name, checked } = e.target;
    setExtras(prevExtras => ({
      ...prevExtras,
      [name]: checked
    }));
  };

  const handleSubmit = () =>{

    if (!foundation || !protein || Object.values(extras).filter(Boolean).length < 2 || !dressing) {
      alert("Du måste välja en bas, ett protein, minst två tillbehör och en dressing!");
      return;
    }

    const salad ={
      foundation: foundation,
      protein: protein, 
      extras: Object.keys(extras).filter(extra => extras[extra]),
      dressing: dressing
    };

    console.log("Sallad skapad:", salad);
    // Here you would call a function passed via props to update the shopping basket state in App
    props.addSaladToOrder(salad);
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        {/* Foundation Component */}
        <FoundationSelector
          foundation={foundation}
          setFoundation={setFoundation}
          foundationList={foundationList}
        />

        {/* Protein Select */}
       <ProteinSelector
          protein={protein}
          setProtein={setProtein}
          proteinList={proteinList}
        />

        {/* Extras Checkboxes */}
        <fieldset className="col-md-12 mb-3">
          <label className="extras">Välj Tillbehör</label>
          <div className="row">
            {extrasList.length > 0 ? (
              extrasList.map((extra) => (
                <div key={extra} className="col-md-4 form-check">
                  <input
                    type="checkbox"
                    id={extra}
                    name={extra}
                    checked={extras[extra] || false}
                    onChange={handleExtraChange}
                    className="form-check-input"
                  />
                  <label htmlFor={extra} className="form-check-label">
                    {extra}
                  </label>
                </div>
              ))
            ) : (
              <p>Inga tillbehör tillgängliga.</p>
            )}
          </div>
        </fieldset>

        {/* Dressing Component */}
        <DressingSelector
          dressing={dressing}
          setDressing={setDressing}
          dressingList={dressingList}
        />
        <button className="btn btn-primary" onClick={handleSubmit} >Lägg till sallad</button>

      </div>
    </div>
  );
}
export default ComposeSalad;