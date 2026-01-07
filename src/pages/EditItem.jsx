import { useState,useEffect } from "react";
import { updateItem } from "../db/inventoryDB";
import "../component/editItem.css";
const EditItemModal = ({ item, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(formData);
    onUpdated();
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Item</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label >Item Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Item name"
              required
            />
          <label >Category</label>
          <select  value={formData.category} onChange={handleChange} name="category">
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home Appliances</option>
            <option>Sports</option>
            <option>Others</option>
          </select>
          <label >Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          <label >Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
            />
          </form>
        </div>
        {/* action buttons */}
        <div className="modal-actions">
              <button 
                type="button" 
                className="save-btn"
                onClick={handleSubmit}>
                Save
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className="delete-btn">
                Cancel
              </button>
            </div>
      </div>
     
    </div>
  );
};
export default EditItemModal;
