import { useRef, useState } from "react";

const AddItem = () => {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  const nameRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileHandle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.onerror = () => setError("Failed to read image");
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!itemName.trim()) {
      setError("Item name is required");
      nameRef.current.focus();
      return;
    }

    if (!quantity || quantity <= 0) {
      setError("Quantity must be greater than 0");
      quantityRef.current.focus();
      return;
    }

    if (!price || price <= 0) {
      setError("Price must be greater than 0");
      priceRef.current.focus();
      return;
    }

    if (!category) {
      setError("Please select a category");
      categoryRef.current.focus();
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      descRef.current.focus();
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName,
      quantity,
      price,
      category,
      description,
      image,
      createdAt: new Date().toISOString(),
    };

    inventory.push(newItem);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    setItemName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage("");
    setSuccess("Item added successfully ✅");
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} className="add-item-form">
        <label>Item Name</label>
        <input ref={nameRef} 
        value={itemName} 
        placeholder="write item name here..."
        onChange={e => setItemName(e.target.value)} />

        <label>Quantity</label>
        <input ref={quantityRef} 
        type="number" 
        value={quantity} 
        placeholder="enter quantity..."
        onChange={e => setQuantity(Number(e.target.value))} />

        <label>Price</label>
        <input ref={priceRef} 
        type="number" 
        value={price} 
        placeholder="enter price..."
        onChange={e => setPrice(Number(e.target.value))} />

        <label>Category</label>
        <select ref={categoryRef} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
          <option>Home Appliances</option>
          <option>Sports</option>
          <option>Others</option>
        </select>

        <label>Description</label>
        <textarea 
        ref={descRef} 
        rows="4" 
        placeholder="write description here..."
        value={description}
        onChange={e => setDescription(e.target.value)} />

        <label>Image (optional)</label>
        <input type="file" accept="image/*" onChange={fileHandle} />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
