import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder'; 
import Salad from './Salad.mjs';
import Navbar from './Navbar'; 

export default App;


function App() {

  //localStorage.clear();
  const [shoppingCart, setSalads] = useState(()=> {
    const saveSalads = localStorage.getItem("savedSalads");
    return saveSalads ? Salad.parse(saveSalads) : [];

  });

  function addSaladToOrder(newSalad){
    
    setSalads(prevSalads=> {
      const updateSalad =[...prevSalads, newSalad];
      localStorage.setItem("savedSalads", JSON.stringify(updateSalad));
      return updateSalad;
    });
  };

  return (
    <div className="container py-4">
      
      <Navbar />
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Mini egen salladsbar</span>
      </header>
      <Outlet context={{ inventory, addSaladToOrder, shoppingCart }} />    
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

