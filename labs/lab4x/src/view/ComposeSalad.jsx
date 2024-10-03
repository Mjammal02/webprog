import { useState, useMemo } from 'react';
import { useOutletContext, useNavigate, useLoaderData } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import FoundationSelector from './FoundationSelector';
import ProteinSelector from './ProteinSelector';
import DressingSelector from './DressingSelector';
import Salad from '../model/Salad.mjs';
import { useId } from 'react';
import './composedSalad.css'


function ComposeSalad() {
  const navigate = useNavigate();
  const id = useId();
  const { addSaladToOrder } = useOutletContext();
  const inventory = useLoaderData();
 

  // Foundation, Protein, and Dressing Lists
  const foundationList = useMemo(() => Object.keys(inventory).filter(name => inventory[name]['foundation']),[inventory]);
  const proteinList = useMemo(() => Object.keys(inventory).filter(name => inventory[name]['protein']),[inventory]);
  const dressingList = useMemo(() => Object.keys(inventory).filter(name => inventory[name]['dressing']),[inventory]);
  const extrasList = useMemo(() => Object.keys(inventory).filter(name => inventory[name]['extra']),[inventory]);

  // State for each salad component
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtras] = useState({
    Bacon: true, 
    Fetaost: true
  });

  const [dressing, setDressing] = useState('');
  const [touched, setTouched] = useState(false); 
  const [extrasValid, setExtrasValid] = useState(true); 
  const clearForm = () => {
    // Clear the form after submission
    setFoundation('');
    setProtein('');
    setDressing('');
    setExtras({
        Bacon: false, 
        Fetaost: false
    });
};

   // Handle extra checkbox changes
   const handleExtraChange = (e) => {
    const { name, checked } = e.target;

    // Uppdatera extras state
    setExtras(prevExtras => {
        const updatedExtras = {
            ...prevExtras,
            [name]: checked
        };
        // Sätt extrasValid baserat på antalet markerade alternativ
        setExtrasValid(Object.keys(updatedExtras).filter(extra => updatedExtras[extra]).length > 1); // Sätt till false om mer än 2 är markerade
        return updatedExtras; // Returnera det uppdaterade objektet
    });
};

      // Handle foundation change
      const handleFoundation = (event) => {
        setFoundation(event.target.value);
      };
        // Handle protein change
    const handleProtein = (event) => {
      setProtein(event.target.value);
    };
      // Handle dressing change
      const handleDressnig = (event) => {
        setDressing(event.target.value);
      };

  const handleSubmit = (event) =>{
    event.preventDefault(); // Prevent default form submission

    if (!extrasValid || !event.target.checkValidity()) {
      setTouched(true)
      return;
    }
    setExtrasValid(true);
    
      // Skapa en ny Salad-instans
       const salad = new Salad();
       salad.add(foundation, inventory[foundation]);
       salad.add(protein, inventory[protein]);
       salad.add(dressing, inventory[dressing]);
 
     //Lägg till tillbehör
      Object.keys(extras).forEach(extra => {
        if (extras[extra]) {
          salad.add(extra, inventory[extra]);
        }
      });

    console.log("Sallad skapad:", salad);
    addSaladToOrder(salad);
    clearForm();
    setExtrasValid(true)
    setTouched(false);
    navigate(`/view-order/confirm/${salad.uuid}`);
    
  }


  return (
    <form onSubmit={handleSubmit} noValidate className={`container col-12 ${touched ? 'was-validated' : ''}`}>
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        {/* Foundation Component */}
        <FoundationSelector
          foundation={foundation}
          setFoundation={handleFoundation}
          foundationList={foundationList}
        />

        {/* Protein Select */}
       <ProteinSelector
          protein={protein}
          setProtein={handleProtein}
          proteinList={proteinList}
        />

        {/* Extras Checkboxes */}
        <fieldset className={`col-md-12 mb-3 ${touched && !extrasValid ? 'is-invalid' : ''}`}>
        <legend className="form-label">Välj Tillbehör</legend>
          <div className="row">
            {extrasList.length > 0 ? (
              extrasList.map((extra) => (
                <div key={extra} className="col-md-4 form-check">
                  <input
                    type="checkbox"
                    id={`${id}-${extra}`} 
                    name={extra}
                    checked={extras[extra] || false}
                    onChange={handleExtraChange}
                    className="form-check-input"
                  />
                  <label htmlFor={`${id}-${extra}`}  className="form-check-label">
                    {extra}
                  </label>
                </div>
              ))
            ) : (
              <p>Inga tillbehör tillgängliga.</p>
            )}
          </div>
        {/* Felmeddelande om minst två tillbehör inte valts */}
        </fieldset>
        {touched && !extrasValid && <div className="invalid-feedback">Du måste minst välja två tillbehör!</div>}


        {/* Dressing Component */}
        <DressingSelector
          dressing={dressing}
          setDressing={handleDressnig}
          dressingList={dressingList}
        />
        <button className="btn btn-primary"  >Lägg till sallad</button>

      </div>
    </form>
  );
}
export default ComposeSalad;