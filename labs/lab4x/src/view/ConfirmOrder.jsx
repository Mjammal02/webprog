import { useParams } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';


function ConfirmOrder() {
  const { id } = useParams(); // Extract the order ID from the URL
  const { shoppingCart } = useOutletContext();

  function checkValidity(checkUuid) {
    // Använd find för att leta efter ett salad med det specifika uuid
    const foundSalad = shoppingCart.find(currentSalad => currentSalad.uuid === checkUuid);
    
    // Returnera true om foundSalad finns, annars false
    return foundSalad !== undefined;
}

  return (
    <div>
      <h2>Order Confirmation</h2>
      {checkValidity(id) ? <p>Your salad order (ID: {id}) has been successfully placed!</p> : <p>No order</p>}
    </div>
  );
}

export default ConfirmOrder;