import { useParams } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';


function ConfirmOrder() {
  const { id } = useParams(); // Extract the order ID from the URL
  const { shoppingCart } = useOutletContext();

  function checkValidity(checkUuid){
    let uuid=false;
    shoppingCart.map(currentSalad=>{

      if(currentSalad.uuid===checkUuid)
        {
          uuid=true;
          return;
        }
    })

    return uuid;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      {checkValidity(id) ? <p>Your salad order (ID: {id}) has been successfully placed!</p> : <p>No order</p>}
    </div>
  );
}

export default ConfirmOrder;