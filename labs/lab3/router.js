import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './src/App';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "compose-salad",
        element: <p>replace with compose salad component</p>
      }
    ]
  },
]);
export default router