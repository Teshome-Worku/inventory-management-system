import { useEffect, useState } from "react";
import { getAllItems } from "../db/inventoryDB";
import "../component/Reports.css";

const Reports = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getAllItems();
    setItems(data);
  };

  // ===== Calculations =====
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(items.map(item => item.category))];

  const LOW_STOCK_LIMIT = 5;
  const lowStockItems = items.filter(item => item.quantity <= LOW_STOCK_LIMIT);

  const categorySummary = categories.map(cat => {
    const catItems = items.filter(item => item.category === cat);
    return {
      category: cat,
      itemsCount: catItems.length,
      totalQty: catItems.reduce((sum, i) => sum + i.quantity, 0),
    };
  });

  return (
    <div className="reports-page">
        <div className="title">
        <h2 className="reports-title">Reports</h2>

        </div>

      {/* ===== Summary Cards ===== */}
      <div className="reports-cards">
        <div className="report-card">
          <p>Total Items</p>
          <h3>{totalItems}</h3>
        </div>

        <div className="report-card">
          <p>Total Quantity</p>
          <h3>{totalQuantity}</h3>
        </div>

        <div className="report-card">
          <p>Categories</p>
          <h3>{categories.length}</h3>
        </div>

        <div className="report-card danger">
          <p>Low Stock</p>
          <h3>{lowStockItems.length}</h3>
        </div>
      </div>

      {/* ===== Low Stock Table ===== */}
      <div className="report-section">
        <h3>Low Stock Items</h3>

        {lowStockItems.length === 0 ? (
          <p className="empty">No low stock items 🎉</p>
        ) : (
          <table className="report-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map(item => (
                <tr key={item.id} className="danger-row">
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== Category Summary Table ===== */}
      <div className="report-section">
        <h3>Category Summary</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Items</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {categorySummary.map(cat => (
              <tr key={cat.category}>
                <td>{cat.category}</td>
                <td>{cat.itemsCount}</td>
                <td>{cat.totalQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
