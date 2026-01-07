import './save-popup.css'
const ConfirmDeleteModal = ({ title, message, onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal small">
  
          <div className="modal-header">
            <h3>{title || "Confirm Delete"}</h3>
          </div>
  
          <div className="modal-body">
            <p>{message || "Are you sure you want to delete this item?"}</p>
          </div>
  
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default ConfirmDeleteModal;
  