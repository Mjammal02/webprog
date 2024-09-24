import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importera Bootstrap
import FoundationSelector from './FoundationSelector';
import ProteinSelector from './ProteinSelector';
import DressingSelector from './DressingSelector';
import Salad from './Salad.mjs';
import { useId } from 'react';


function ComposeSalad(props) {
  const id = useId();


  // Foundation, Protein, and Dressing Lists
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const extrasList  = Object.keys(props.inventory).filter(name => props.inventory[name].extra);


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



   // Handle extra checkbox changes
   const handleExtraChange = (e) => {
    const { name, checked } = e.target;
    setExtras(prevExtras => ({
      ...prevExtras,
      [name]: checked
    }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Förhindra standard formulärsubmission
    setTouched(true); // Aktivera validering

       // Kolla om minst två tillbehör är valda
       if (Object.values(extras).filter(Boolean).length < 2) {
        setErrorMessage("Du måste välja minst två tillbehör!");
        setExtrasValid(false);
        return;
      } else {
        setExtrasValid(true); // Om giltigt, sätt flaggan till true
        setErrorMessage(''); // Återställ felmeddelande om giltiga tillbehör
      }

    const salad = new Salad();
    const foundationItem = props.inventory[foundation];
    const proteinItem = props.inventory[protein];
    const dressingItem = props.inventory[dressing];

    if (!foundationItem || !proteinItem || !dressingItem) {
        setErrorMessage("Ett eller flera valda ingredienser är ogiltiga.");
        return;
    }

    salad.add(foundation, foundationItem);
    salad.add(protein, proteinItem);
    salad.add(dressing, dressingItem);

    Object.keys(extras).forEach(extra => {
        if (extras[extra] && props.inventory[extra]) {
            salad.add(extra, props.inventory[extra]);
        }
    });

    console.log("Sallad skapad:", salad);
    props.addSaladToOrder(salad);

    // Återställ formuläret
    setFoundation('');
    setProtein('');
    setDressing('');
    setExtras({
        Bacon: false, 
        Fetaost: false
    });
    setTouched(false);
   // setErrorMessage('');
}


  return (
    <form onSubmit={handleSubmit} noValidate className={`container col-12 ${touched ? 'was-validated' : ''}`}>
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        {/* Foundation Component */}
        <FoundationSelector
          foundation={foundation}
          setFoundation={setFoundation}
          foundationList={foundationList}
        />
        <div className="invalid-feedback">Du måste välja en bas!</div>

        {/* Protein Select */}
       <ProteinSelector
          protein={protein}
          setProtein={setProtein}
          proteinList={proteinList}
        />
        <div className="invalid-feedback">Du måste välja en protein!</div>

        {/* Extras Checkboxes */}
        <fieldset className="col-md-12 mb-3">
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
        {!extrasValid && <div className="text-danger">Du måste välja minst två tillbehör!</div>}
        </fieldset>

        {/* Dressing Component */}
        <DressingSelector
          dressing={dressing}
          setDressing={setDressing}
          dressingList={dressingList}
        />
        <div className="invalid-feedback">Du måste välja en dressing!</div>
        <button className="btn btn-primary" onClick={handleSubmit} >Lägg till sallad</button>

      </div>
    </form>
  );
}
export default ComposeSalad;