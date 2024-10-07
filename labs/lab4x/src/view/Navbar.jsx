import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="nav nav-tabs">
        <li className="nav-item">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to="/"
        >
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to="/compose-salad"
        >
          Komponera en sallad 
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to="/view-order"
        >
          Visa varukorg
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to="/order-history"
        >
          Visa beställningar
        </NavLink>
      </li>
    </ul>
  );
}
