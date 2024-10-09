import React from 'react';
import { useOutletContext } from 'react-router-dom';

const OrderHistory = () => {
  const { orderConfirmations, clearOrderHistory } = useOutletContext(); // Hämta orderbekräftelser från App

  return (
    <div className="container">
      <h2>Orderhistorik</h2>
      {orderConfirmations.length === 0 ? (
        <p>Inga tidigare ordrar.</p>
      ) : (
        <>
        <ul className="list-group">
          {orderConfirmations.map((confirmation, index) => (
            <li key={index} className="list-group-item">
              <strong>Order ID:</strong> {confirmation.uuid} <br />
              <strong>Status:</strong> {confirmation.status} <br />
              <strong>Tid:</strong> {new Date(confirmation.timestamp).toLocaleString()} <br />
              <strong>Antal sallader:</strong> {confirmation.saladCount}  <br />
              <strong>Pris:</strong> {confirmation.price} kr <br />
              
            </li>
          ))}
        </ul>
        {/* Knapp för att rensa orderhistorik */}
        <button className="btn btn-danger mt-3" onClick={clearOrderHistory}>
        Rensa Orderhistorik
      </button>
      </>
      )}
    </div>
  );
};

export default OrderHistory;
