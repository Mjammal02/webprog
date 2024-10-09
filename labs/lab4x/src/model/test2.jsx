import { useEffect, useMemo, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as bootstrap from 'bootstrap'
function ViewOrder() {
    const { salads } = useOutletContext();
    const [confirmationInfo, setConfirmationInfo] = useState(null);
    /* const currentDate = new Date();  */
    /* getOrderPrice(); */
    /* getOrderIngridients(); */

    /* console.log(Object.keys(salads.ingridientList)) */
    /*  localStorage.clear(); */
    /*   const shoppingCart = useMemo(() => salads, [salads]);
     
  
       function temp(currentSalad){
          console.log(salads)
          return Object.keys(salads[currentSalad]['ingridientList']).map(currentIngridient => currentIngridient).join(", ") +": "+ tempPrice(salads[currentSalad]['ingridientList']) +" kr";
       }
       function tempPrice(ingridientList){
  
             return Object.values(ingridientList).reduce((totalPrice,ingridient) => {
                  return totalPrice += ingridient['price'] || 0;
                }, 0)
       } */

    function getOrderPrice() {

        let currentPrice = 0;

        salads.map(currentSalad => {
            Object.values(currentSalad['ingridientList']).map(currentIngridient => {
                currentPrice += currentIngridient['price'];
            })
        })

        return currentPrice;

        /*  return Object.keys(this.ingridientList).reduce((totalPrice, ingridientItem) => {
  
    return totalPrice + (this.ingridientList[ingridientItem]['price'] || 0); // ta price. eller om det inte finns, ta 0 
    },0); */
    }
    function showConfirmationInfo() {
        useEffect(() => {
            if (confirmationInfo) {
               const toastElement = document.querySelector('.toast');
               const toast = new bootstrap.Toast(toastElement);  
               toast.show();  
            }
         }, [confirmationInfo]);
        if (confirmationInfo) {
            
            return (
                <div className="toast align-items-center m-auto my-4" role="alert" aria-live="assertive" aria-atomic="true">
                    <div>
                        <div className="toast-body">
                            <p>Order Confirmation!</p> 
                            <p>Status: {confirmationInfo.status}</p>
                            <p>timestamp: {confirmationInfo.timestamp}</p>
                            <p>uuid: {confirmationInfo.uuid}</p>
                            <p>price: {confirmationInfo.price}</p>
                            <p>order: {JSON.stringify(confirmationInfo.order)}</p>
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>

            )
        }

    }

    function getOrderIngridients() {
        let currentIngridientArray = [];
        salads.map(currentSalad => {
            /* Object.assign(currentIngridientArray, (Object.keys(currentSalad['ingridientList']))); */
            currentIngridientArray.push(Object.keys(currentSalad['ingridientList']))
        });
        /*  console.log(currentIngridientArray) */
        /*    console.log(JSON.stringify(currentIngridientArray)) */
        return JSON.stringify(currentIngridientArray);
    }
    function showAllIngridient(currentSalad) {

        return Object.keys(currentSalad['ingridientList']).map(currentIngridient => currentIngridient).join(", ") + " " + currentSalad.getPrice() + " kr";

    }
    function handleSubmit(event) {
        event.preventDefault();
        if (salads !== undefined || salads !== null) {
            fetch(`http://localhost:8080/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                /* body: JSON.stringify({
                    "status":"confirmed",
                    "timestamp": currentDate,
                    "uuid": uuidv4(),
                    "price" : getOrderPrice(),
                    "order": getOrderIngridients()
                }) */
                body: getOrderIngridients()
            }).then(response => {
                if (!response.ok) {
                    throw new Error("huh")
                }
                return response.json();
            }).then(confirmation => {
                setConfirmationInfo(confirmation);
            })
            console.log("ho")
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="container col-12">

                <div className="row h-200 p-5 bg-light border rounded-3">
                    <h2>Din varukorg</h2>
                    <ul className="list-group list-group-flush">
                        {salads.map(currentSalad =>
                            <li className="list-group-item bg-white border rounded-3" key={currentSalad.uuid}>
                                {showAllIngridient(currentSalad)}
                            </li>
                        )}
                        {/*  {Object.keys(salads).map(currentKey => 
                       <li className="list-group-item bg-white border rounded-3" key={salads[currentKey]['uuid']}>
                            {temp(currentKey)}
                       </li> 
                    )}  */}
                    </ul>
                     
                </div>
                {/* Skicka vidare salads till child so confirmationMessage för att kolla uuid */}
  
                <Outlet context={{ salads }}></Outlet>
                <div>
                    <button type="submit" className='btn btn-primary  mx-auto'>Beställ</button>
                </div>
                <div>
                {showConfirmationInfo()}
                </div>
            </div>
        </form>
    );
}
export default ViewOrder;