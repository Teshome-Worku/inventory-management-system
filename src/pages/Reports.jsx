import { useEffect, useState } from "react";
import { getAllItems } from "../db/inventoryDB";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../component/Reports.css";

const Reports = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const focus = params.focus || (location.state && location.state.focus);

  useEffect(() => {
    if (!focus) {
      document.title = "Reports";
      return;
    }
    if (focus === "totalItems") document.title = "Reports - Total Items";
    else if (focus === "quantity") document.title = "Reports - Total Quantity";
    else if (focus === "categories") document.title = "Reports - Categories";
    else if (focus === "lowStock") document.title = "Reports - Low Stock";
  }, [focus]);

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
  // If a focus is provided via URL param or state, render a focused view
  if (focus) {
    return (
      <div className="reports-page">
        <div className="title">
          <h2 className="reports-title">{`Reports — ${focus}`}</h2>
          <button onClick={() => navigate('/reports')} style={{marginLeft:12}}>Back</button>
        </div>

        {focus === "totalItems" && (
          <div className="report-section">
            <h3>Total Items</h3>
            <p className="stat-number">{totalItems}</p>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.category}</td>
                    <td>{i.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {focus === "quantity" && (
          <div className="report-section">
            <h3>Total Quantity</h3>
            <p className="stat-number">{totalQuantity}</p>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {focus === "categories" && (
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
        )}

        {focus === "lowStock" && (
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
        )}
      </div>
    );
  }

  // Default: full reports page
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
