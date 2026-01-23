import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const closeSidebar = () => setOpen(false);
  return (
    <>
      {/* Hamburger Button */}
      <button className={`hamburger ${open ? "open" : ""}`} 
      onClick={() => setOpen(!open)}>
        {open? "✖":"☰"}
      </button>
      {/* Overlay */}
      {open && <div className="overlay" onClick={closeSidebar}></div>}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Inventory</h2>
          <p className="subtitle">Management System</p>
        </div>
        <nav className="nav-links">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/addItem"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ➕ Add Item
          </NavLink>
          <NavLink
            to="/inventory_list"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📦 Inventory
          </NavLink>
          <NavLink
            to="/reports"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🔂 Reports
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
