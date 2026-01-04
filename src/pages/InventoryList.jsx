import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../db/inventoryDB";
import "../component/InventoryList.css";
import trash from '../assets/trash.png';
import editButton from '../assets/edit-button.png';

const InventoryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getAllItems();
    setItems(data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems(); // refresh list after delete
  };

  return (
    <div className="inventory-page">
      <h2 className="inventory-page-title">Inventory List</h2>

      {items.length === 0 ? (
        <p className="empty">No items found</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Added On</th>
              <th>Actions</th>

            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="item-cell">
                    {item.image && (
                      <img src={URL.createObjectURL(item.image)} alt={item.name} />
                    )}
                    <span>{item.name}</span>
                  </div>
                </td>

                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.createdAt.toLocaleDateString()}</td>

  
                <td>
                  <div className="actions">
                    <button className="edit-btn"><img src={trash} alt="edit-btn"/></button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <img src={editButton} alt="delete-btn"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;
