import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder"; 
import ConfirmOrder from './ConfirmOrder';

const router = createBrowserRouter([
  {
    element: <App />, // Render the App component for all routes
    children: [
      {
        path: "compose-salad",
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
