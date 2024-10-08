import { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importera Bootstrap
import FoundationSelector from './FoundationSelector';
import ProteinSelector from './ProteinSelector';
import DressingSelector from './DressingSelector';
import Salad from './Salad.mjs';
import { useId } from 'react';


function ComposeSalad(props) {
  const id = useId();

  // Foundation, Protein, and Dressing Lists
  /*
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const extrasList  = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
*/
  const foundationList = useMemo(() => Object.keys(props.inventory).filter(name => props.inventory[name]['foundation']),[props.inventory]);
  const proteinList = useMemo(() => Object.keys(props.inventory).filter(name => props.inventory[name]['protein']),[props.inventory]);
  const dressingList = useMemo(() => Object.keys(props.inventory).filter(name => props.inventory[name]['dressing']),[props.inventory]);
  const extrasList = useMemo(() => Object.keys(props.inventory).filter(name => props.inventory[name]['extra']),[props.inventory]);

  // State for each salad component
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtras] = useState({
    Bacon: true, 
    Fetaost: true
  });
  const [dressing, setDressing] = useState('');
  const isExtraAmpuntValid = useMemo(() => Object.keys(extras).filter(checkedExtra => extras[checkedExtra]).length >= 2, [extras]);
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

  function resetStateAfterSubmit(){
    setFoundation('');
    setProtein('');
    setDressing('');
    setExtras({});

}


  const handleSubmit = (event) => {
    event.preventDefault(); // Förhindra standardformulärsubmission
    //setTouched(true); // Aktivera validering
  
    if (event.target.checkValidity() ) {
      const foundationItem = props.inventory[foundation];
      const proteinItem = props.inventory[protein];
      const dressingItem = props.inventory[dressing];
  
      // Kontrollera att de valda ingredienserna är giltiga
      /*
      if (!foundationItem || !proteinItem || !dressingItem  || !isExtraAmpuntValid) {
        return;
      }
        */
  
      const salad = new Salad();
      salad.add(foundation, foundationItem);
      salad.add(protein, proteinItem);
      salad.add(dressing, dressingItem);
  
      // Lägg till tillbehör
      Object.keys(extras).forEach(extra => {
        if (extras[extra] && props.inventory[extra]) {
          salad.add(extra, props.inventory[extra]);
        }

              // Nu kan du logga salladen eller skicka den vidare
      console.log("Sallad skapad:", salad);
      props.addSaladToOrder(salad);
        // Återställ formuläret
        resetStateAfterSubmit()

      });
  

      setTouched(false); // Återställ valideringsstatus
    } else {
      // Om formuläret inte är giltigt
      setTouched(true);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={`container col-12 ${touched ? 'was-validated' : ''}`} noValidate>
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        {/* Foundation Component */}
        <ProteinSelector
          protein={protein}
          setProtein={setProtein}
          proteinList={proteinList}
        />

        {/* Protein Select */}
       <ProteinSelector
          protein={protein}
          setProtein={setProtein}
          proteinList={proteinList}
        />

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
        </fieldset>

        {/* Dressing Component */}
        <DressingSelector
          dressing={dressing}
          setDressing={setDressing}
          dressingList={dressingList}
        />
        <button className="btn btn-primary" onClick={handleSubmit} >Lägg till sallad</button>

      </div>
    </form>
  );
}
export default ComposeSalad;