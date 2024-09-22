import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';


function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  const [salads, setSalads] = useState([]);

  const addSaladToOrder = (newSalad) => {
    setSalads(prevSalads => [...prevSalads, newSalad]);
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      <ComposeSalad inventory={inventory} addSaladToOrder={addSaladToOrder}></ComposeSalad>
          {/* Display Ordered Salads */}
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

/* <div className="mt-5">
<h3>Beställda sallader</h3>
<ul>
  {salads.map((salad, index) => (
    <li key={index}>
      Bas: {salad.foundation}, Protein: {salad.protein}, Tillbehör: {salad.extras.join(', ')}, Dressing: {salad.dressing}
    </li>
  ))}
</ul>
</div>
 */

export default App;