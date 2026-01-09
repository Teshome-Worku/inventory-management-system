import { useEffect, useState } from "react";
import { getAllItems, deleteItem } from "../db/inventoryDB";
import "../component/InventoryList.css";
import trash from '../assets/trash.png';
import editButton from '../assets/edit-button.png';
import EditItemModal from "./EditItem";
import ConfirmDeleteModal from "../component/ConfirmDeleteModal";
import SuccessToast from "../component/SuccessToast";
const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    loadItems();
  }, []);
  const loadItems = async () => {
    const data = await getAllItems();
    setItems(data);
  };
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    await deleteItem(selectedId);
    setShowDeleteModal(false);
    loadItems();
  };
  return (
    <div className="inventory-page">
      <div className="title">
        <h2 className="inventory-page-title">Inventory List</h2>
      </div>
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
                <td>{item.createdAt.toLocaleDateString('en-US',{
                  year:'numeric',
                  month:'short',
                  day:'numeric'
                })}</td>
                <td>
                  <div className="actions">
                    <button className="edit-btn" onClick={()=>setSelectedItem(item)}>
                      <img src={editButton} alt="edit-btn"/>
                      
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      <img src={trash} alt="delete-btn"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedItem && (
      <EditItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdated={()=>{
          loadItems()
          setShowSuccess(true)
        }}
      />
      )}
      {showDeleteModal && (
      <ConfirmDeleteModal
        title="Delete Item"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      )}
      {showSuccess && (
        <SuccessToast
          message="Item saved successfully"
          onClose={() => setShowSuccess(false)}
        />
      )}

    </div>
  );
};
export default InventoryList;
