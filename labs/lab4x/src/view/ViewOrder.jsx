import React from 'react';
import Salad from '../model/Salad.mjs';
import { useOutletContext,Outlet } from 'react-router-dom';



function ViewOrder() {
    const { shoppingCart } = useOutletContext();
    //const allaSalader = Salad.parse(shoppingCart);
    console.log(shoppingCart);

    if (!shoppingCart || shoppingCart.length === 0) {
        return (
            <div className="container col-12">
                <div className="row h-200 p-5 bg-light border rounded-3">
                    <h2>Din varukorg</h2>
                    <p>Inga sallader i varukorgen.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <h2>Din varukorg</h2>
                <ul className="list-group list-group-flush">
                    {shoppingCart.map((salad) => {
                        return (
                            <li key={salad.uuid} className="list-group-item d-flex justify-content-between">
                                {/* Visa ingredienserna */}
                                <span>
                                    {Object.keys(salad.selectedIngredients).map((ingredient) => (
                                        <span key={salad.uuid + '-' + ingredient}>
                                            {ingredient+", "} 
                                        </span>
                                    ))}
                                </span>
                                <strong>{salad.getPrice()} kr</strong>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Outlet context={{shoppingCart}}></Outlet>
        </div>
    );
}

export default ViewOrder;
