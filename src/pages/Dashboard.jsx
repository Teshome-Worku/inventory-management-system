import { useEffect, useState } from "react";
import "../component/dashboard.css";

const LOW_STOCK_LIMIT = 5;

const Dashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedInventory = localStorage.getItem("inventory");
    if (storedInventory) {
      setItems(JSON.parse(storedInventory));
    }
  }, []);

  /* ===== SUMMARY LOGIC ===== */

  // 1. Total unique items
  const totalItems = items.length;

  // 2. Total quantity (sum of all quantities)
  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity),0);

  // 3. Unique categories
  const categoriesCount = new Set(items.map(item => item.category)).size;

  // 4. Low stock items
  const lowStockItems = items.filter(
    item => Number(item.quantity) <= LOW_STOCK_LIMIT
  );

  // 5. Recently added items (latest first)
  const recentItems = [...items]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
  return (
    <div className="dashboard">

      <h1 className="dashboard-title">Dashboard</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-number">{totalItems}</p>
        </div>

        <div className="stat-card">
          <h3>Total Quantity</h3>
          <p className="stat-number">{totalQuantity}</p>
        </div>

        <div className="stat-card">
          <h3>Categories</h3>
          <p className="stat-number">{categoriesCount}</p>
        </div>

        <div className="stat-card warning">
          <h3>Low Stock</h3>
          <p className="stat-number">{lowStockItems.length}</p>
        </div>
      </div>
      {/* ===== DASHBOARD SECTIONS ===== */}
      <div className="dashboard-sections">
        {/* LOW STOCK */}
        <div className="section">
          <h2>⚠ Low Stock Items</h2>

          {lowStockItems.length === 0 ? (
            <p className="empty">No low stock items 🎉</p>
          ) : (
            <ul className="low-stock-list">
              {lowStockItems.slice(0, 5).map(item => (
                <li key={item.id}>
                  <span>{item.itemName}</span>
                  <span className="qty danger">
                    {item.quantity} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* RECENT ITEMS */}
        <div className="section">
          <h2>🆕 Recently Added</h2>

          {recentItems.length === 0 ? (
            <p className="empty">No items added yet. Start by adding inventory.</p>
          ) : (
            <div className="recent-grid">
              {recentItems.map(item => (
                <div className="recent-card" key={item.id}>
                  <img src={item.image} alt={item.itemName} />
                  <div>
                    <h4>{item.itemName}</h4>
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