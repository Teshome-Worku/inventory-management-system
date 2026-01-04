import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Inventory</h2>
        <p className="subtitle">Management System</p>
      </div>

      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/addItem"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          ➕ Add Item
        </NavLink>
        <NavLink
          to="/inventory_list"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          📦Inventory 
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;