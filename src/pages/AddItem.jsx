import { useState,useRef } from "react";
import { addItem } from "../db/inventoryDB";
import { useNavigate } from "react-router-dom";
import SavePopup from "../component/SavePopup";
const AddItem = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  const [nameError, setNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descError, setDescError] = useState("");
  const [savePopup,setSavePopup]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description:"",
    image: null,
  });

  /* ==========================
     HANDLE INPUT CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ==========================
     SUBMIT FORM
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setNameError("Item name is required");
      nameRef.current.focus();
      setTimeout(()=>{
          setNameError("")
      },3000);
      return;
  }
  
  if (!formData.quantity || formData.quantity <= 0) {
      setQuantityError("Quantity must be greater than 0");
      quantityRef.current.focus();
      setTimeout(()=>{
          setQuantityError("")
      },3000);
      return;
  }
  
  if (!formData.price || formData.price <= 0) {
      setPriceError("Price must be greater than 0");
      priceRef.current.focus();
      setTimeout(()=>{
          setPriceError("")
      },3000);
      return;
  }
  
  if (!formData.category) {
      setCategoryError("Please select a category");
      categoryRef.current.focus();
      setTimeout(()=>{
          setCategoryError("")
      },3000);
      return;
  }
  
  if (!formData.description.trim()) {
      setDescError("Description is required");
      descRef.current.focus();
      setTimeout(()=>{
          setDescError("")
      },3000);
      return;
  }

    const newItem = {
      id: Date.now(), // unique ID
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      description:formData.description,
      price: Number(formData.price),
      image: formData.image,
      createdAt: new Date(),
    };

    try {
      await addItem(newItem);
      setSavePopup(true)
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };
  const closePopup=()=>{
    setSavePopup(false);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
      description: "",
      image: null,
    });
    
    navigate("/");

  }

  return (
    <div className="add-item">
      <h1>Add Inventory Item</h1>

      <form onSubmit={handleSubmit} className="add-item-form">
        <label >Item Name</label>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
        />
        {nameError && <p className="error">{nameError}</p>}

        <label >Category</label>
        <select ref={categoryRef} value={formData.category} onChange={handleChange} name="category">
          <option value="">Select Category</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
          <option>Home Appliances</option>
          <option>Sports</option>
          <option>Others</option>
        </select>
        {categoryError && <p className="error">{categoryError}</p>}

        <label >Quantity</label>
        <input
          type="number"
          ref={quantityRef}
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        {quantityError && <p className="error">{quantityError}</p>}

        
        <label>Price</label>
        <input
          type="number"
          name="price"
          ref={priceRef}
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        {priceError && <p className="error">{priceError}</p>}

        <label >Description</label>
        <input 
          type="text"
          ref={descRef}
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
        />
        {descError && <p className="error">{descError}</p>}


        <label >Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit"> Add Item</button>
      </form>
      {savePopup&& <SavePopup onClose={closePopup}/>}
    </div>
  );
};

export default AddItem;
