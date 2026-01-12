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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);
  
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
    setCurrentPage(1);

  };
  const filteredItems = items
  .filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(item =>
    selectedCategory === "all"
      ? true
      : item.category === selectedCategory
  )
  .sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "qty-asc":
        return a.quantity - b.quantity;
      case "qty-desc":
        return b.quantity - a.quantity;
      case "oldest":
        return a.createdAt - b.createdAt;
      default: // newest
        return b.createdAt - a.createdAt;
    }
  });
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  return (
    <div className="inventory-page">
      <div className="title">
        <h2 className="inventory-page-title">Inventory List</h2>
      </div>

      <div className="inventory-controls">

        {/* Search */}
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {[...new Set(items.map(item => item.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="qty-asc">Quantity ↑</option>
          <option value="qty-desc">Quantity ↓</option>
        </select>
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
            {paginatedItems.map((item) => (
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
      {/* paging logic  */}

      {filteredItems.length > ITEMS_PER_PAGE && (
      <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
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
