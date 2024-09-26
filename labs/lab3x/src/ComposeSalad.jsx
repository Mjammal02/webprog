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
    setExtras(prevExtras => ({
      ...prevExtras,
      [name]: checked
    }));
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

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault(); // Prevent default form submission
    setTouched(true)

    
    if(!event.target.checkValidity()){ 
      
      return 
    }
    
       // Validate form inputs
       const extrasCount = Object.values(extras).filter(v => v).length;

       /*
       if (!foundation || !protein || !dressing || extrasCount < 2) {
        setExtrasValid(false);
         return;
       }*/
      // Skapa en ny Salad-instans
       const salad = new Salad();
       salad.add(foundation, props.inventory[foundation]);
       salad.add(protein, props.inventory[protein]);
       salad.add(dressing, props.inventory[dressing]);
 
     //Lägg till tillbehör
      Object.keys(extras).forEach(extra => {
        if (extras[extra]) {
          salad.add(extra, props.inventory[extra]);
        }
      });

    console.log("Sallad skapad:", salad);
    // Here you would call a function passed via props to update the shopping basket state in App
    props.addSaladToOrder(salad);
    clearForm();
    setTouched(false);
    setExtrasValid(true); 
    
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
        <fieldset className={`col-md-12 mb-3 ${extrasValid ? '' : 'is-invalid'}`}>
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
                    required
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
        {!extrasValid && <div className="invalid-feedback">Du måste minst välja två tillbehör!</div>}
        </fieldset>

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