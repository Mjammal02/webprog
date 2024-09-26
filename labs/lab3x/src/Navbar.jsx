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
          Beställ sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to="/view-order"
        >
          Se beställning
        </NavLink>
      </li>
    </ul>
  );
}
