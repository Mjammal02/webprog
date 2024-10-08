import React, { useState } from 'react'; // useState för att hantera state
import Salad from '../model/Salad.mjs';
import { useOutletContext, Outlet } from 'react-router-dom';
// Om du inte redan har Bootstrap kan du inkludera den som följande:
// import 'bootstrap/dist/css/bootstrap.min.css';

function ViewOrder() {
    const { shoppingCart, addOrderConfirmation, clearShoppingCart } = useOutletContext();
    const [orderConfirmation, setOrderConfirmation] = useState(null);
    const [error, setError] = useState(null);

    // Funktion för att lägga order
    const placeOrder = async () => {
        try {
            const orderData = shoppingCart.map((salad) => Object.keys(salad.selectedIngredients));

            const response = await fetch('http://localhost:8080/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const data = await response.json();
            // Lägg till antal sallader till orderbekräftelsen
            const saladCount = shoppingCart.length; // Antal sallader
            const orderWithCount = {
                ...data,
                saladCount: saladCount, // Lägg till antal sallader i bekräftelsen
            };
            setOrderConfirmation(orderWithCount); // Spara bekräftelsen i state
            addOrderConfirmation(orderWithCount); 
            clearShoppingCart(); 
        } catch (error) {
            setError(error.message); // Hantera eventuella fel
        }
    };

 

    return (
        <div className="container col-12">
            <>
                {/* Knapp för att rensa orderhistorik */}
                <button className="btn btn-danger mt-3" onClick={clearShoppingCart}>
                Rensa Varukorg
            </button>
            </>
            <div className="row h-200 p-5 bg-light border rounded-3">
                <h2>Din varukorg</h2>
                {/* Visa innehåll om varukorgen inte är tom */}
                {shoppingCart.length > 0 ? (
                    <>
                <ul className="list-group list-group-flush">
                    {shoppingCart.map((salad) => (
                        <li key={salad.uuid} className="list-group-item d-flex justify-content-between">
                            {/* Visa ingredienserna */}
                            <span>
                                {Object.keys(salad.selectedIngredients).map((ingredient) => (
                                    <span key={salad.uuid + '-' + ingredient}>
                                        {ingredient + ", "} 
                                    </span>
                                ))}
                            </span>
                            <strong>{salad.getPrice()} kr</strong>
                        </li>
                    ))}
                </ul>
                <button onClick={placeOrder} className="btn btn-primary mt-3">Lägg order</button>
                </>
                ) : (
                    <p>Inga sallader i varukorgen.</p>
                )}
                {/* Visa orderbekräftelse om den finns */}
                {orderConfirmation && (
                    <div className="toast show mt-4" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="mr-auto">Order Bekräftelse</strong>
                            <small>  { new Date( orderConfirmation.timestamp).toLocaleString()}</small>
                        </div>
                        <div className="toast-body">
                            Status: {orderConfirmation.status} <br />
                            Order ID: {orderConfirmation.uuid} <br/>
                            Tid: {orderConfirmation.timestamp} kr <br />
                            Antal sallader: {orderConfirmation.saladCount}  <br />
                            Pris: {orderConfirmation.price} kr <br />
                            
                        </div>
                    </div>
                )}

                {/* Visa felmeddelande om något gick fel */}
                {error && <p className="text-danger">Error: {error}</p>}
            </div>
            <Outlet context={{ shoppingCart }}></Outlet>
        </div>
    );
}

export default ViewOrder;
