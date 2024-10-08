import { createBrowserRouter } from "react-router-dom";
import App from '../view/App';
import ComposeSalad from "../view/ComposeSalad";
import ViewOrder from "../view/ViewOrder"; 
import ConfirmOrder from '../view/ConfirmOrder';
import OrderHistory from "../view/OrderHistory"; 
import { inventoryLoader } from '../model/loaders';

const router = createBrowserRouter([
  {
    element: <App />, // Render the App component for all routes
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad , // Component for /compose-salad
      },
      {
        path: "view-order", // Define path for view-order
        Component: ViewOrder, // Render ViewOrder component
        children: [
          {
            path: "confirm/:id", // Add confirmation route as a child of view-order
            Component: ConfirmOrder, // Component for showing confirmation
          }
        ],
      },
      {
        path: "order-history",
        Component: OrderHistory , // Component for /compose-salad
      }
      ,
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>, // Default element for /
      },
      {
        path: '*', // Catch-all route
        element: <p>Page not found</p>, // Displayed for any undefined routes
      }
    ],
  },
]);

export default router;
