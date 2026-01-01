import { useEffect, useState } from "react";
import "../component/inventoryList.css";

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("inventory")) || [];
    setItems(data);
  }, []);

  // 🧠 FILTER + SORT LOGIC
  const filteredItems = items
    .filter(item =>
      item.itemName.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      category === "all" ? true : item.category === category
    )
    .sort((a, b) => {
      if (sortBy === "qty") return a.quantity - b.quantity;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="inventory-page">
      <h1 className="page-title">Inventory</h1>
      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="Stationery">Stationery</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Newest</option>
          <option value="name">Name</option>
          <option value="qty">Quantity</option>
        </select>
      </div>

      {/* List */}
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          📦 No items found
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredItems.map(item => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="item-info">
                <h3>{item.itemName}</h3>
                <p>{item.category}</p>
                <span className={`qty ${item.quantity < 5 ? "low" : ""}`}>
                  Qty: {item.quantity}
                </span>
              </div>

              <div className="actions">
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;
