import { useEffect, useState } from "react";
import { getAllItems } from "../db/inventoryDB";
import "../component/dashboard.css";
import total from "../assets/total.png";
import quantity from "../assets/quantity.png";
import category from "../assets/category.png";
import lowStock from "../assets/low.png";
import { useNavigate } from "react-router-dom";

const LOW_STOCK_LIMIT = 5;

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInventory = async () => {
      const data = await getAllItems();
      setItems(data);
    };
    loadInventory();
  }, []);

  const totalItems = items.length;

  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity), 0);

  const categoriesCount = new Set(
    items.map((item) => item.category)).size;

  const lowStockItems = items.filter(
    (item) => Number(item.quantity) <= LOW_STOCK_LIMIT
  );

  const recentItems = [...items]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <div className="dashboard">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <button
          className="add-inventory-btn"
          onClick={() => navigate("/addItem")}
        >
          + Add Inventory
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate("/reports/totalItems")}>
          <img src={total} alt="Total Items" className="stat-icon" />
          <h3>Total Items</h3>
          <p className="stat-number">{totalItems}</p>
        </div>

        <div className="stat-card" onClick={() => navigate("/reports/quantity")}>
          <img src={quantity} alt="Total Quantity" className="stat-icon" />
          <h3>Total Quantity</h3>
          <p className="stat-number">{totalQuantity}</p>
        </div>

        <div className="stat-card" onClick={() => navigate("/reports/categories")}>
          <img src={category} alt="Categories" className="stat-icon" />
          <h3>Categories</h3>
          <p className="stat-number">{categoriesCount}</p>
        </div>

        <div className={`stat-card ${lowStockItems.length>0?"warning":""}`} onClick={() => navigate("/reports/lowStock")}>
          <img src={lowStock} alt="Low Stock" className="stat-icon" />
          <h3>Low Stock</h3>
          <p className="stat-number">{lowStockItems.length}</p>
        </div>
      </div>

      {/* ===== SECTIONS ===== */}
      <div className="dashboard-sections">
        {/* Low Stock */}
        <div className="section">
          <h2>⚠ Low Stock Items</h2>

          {lowStockItems.length === 0 ? (
            <p className="empty">No low stock items 🎉</p>
          ) : (
            <ul className="low-stock-list">
              {lowStockItems.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span className="qty danger">{item.quantity} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent */}
        <div className="section">
          <h2>🆕 Recently Added</h2>

          {recentItems.length === 0 ? (
            <p className="empty">
              No items added yet. Start by adding inventory.
            </p>
          ) : (
            <div className="recent-grid">
              {recentItems.map((item) => (
                <div className="recent-card" key={item.id}>
                  {item.image && (
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt={item.name}
                    />
                  )}
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                    <small>Qty: {item.quantity}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};
export default Dashboard;
