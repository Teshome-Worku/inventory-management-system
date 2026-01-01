import { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import SavePopup from "../component/SavePopup"; 

const AddItem = () => {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  const navigate=useNavigate();
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
  const [nameError, setNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [descError, setDescError] = useState("");
  const [savePopup,setSavePopup]=useState(false);
  
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

    if (!itemName.trim()) {
        setNameError("Item name is required");
        nameRef.current.focus();
        setTimeout(()=>{
            setNameError("")
        },3000);
        return;
    }

    if (!quantity || quantity <= 0) {
        setQuantityError("Quantity must be greater than 0");
        quantityRef.current.focus();
        setTimeout(()=>{
            setQuantityError("")
        },3000);
        return;
    }

    if (!price || price <= 0) {
        setPriceError("Price must be greater than 0");
        priceRef.current.focus();
        setTimeout(()=>{
            setPriceError("")
        },3000);
        return;
    }

    if (!category) {
        setCategoryError("Please select a category");
        categoryRef.current.focus();
        setTimeout(()=>{
            setCategoryError("")
        },3000);
        return;
    }

    if (!description.trim()) {
        setDescError("Description is required");
        descRef.current.focus();
        setTimeout(()=>{
            setDescError("")
        },3000);
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
    setSavePopup(true);
  };
  const closePopup=()=>{
    setSavePopup(false);
    setItemName("");
    setQuantity("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage("");
    navigate('/');
  }

  return (
    <div className="add-item">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <label>Item Name</label>
        <input ref={nameRef} 
        value={itemName} 
        placeholder="write item name here..."
        onChange={e => setItemName(e.target.value)} />
        {nameError && <p className="error">{nameError}</p>}

        <label>Quantity</label>
        <input ref={quantityRef} 
        type="number" 
        value={quantity} 
        placeholder="enter quantity..."
        onChange={e => setQuantity(Number(e.target.value))} />
        {quantityError && <p className="error">{quantityError}</p>}



        <label>Price</label>
        <input ref={priceRef} 
        type="number" 
        value={price} 
        placeholder="enter price..."
        onChange={e => setPrice(Number(e.target.value))} />
        {priceError && <p className="error">{priceError}</p>}


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
        {categoryError && <p className="error">{categoryError}</p>}

        <label>Description</label>
        <textarea 
        ref={descRef} 
        rows="4" 
        placeholder="write description here..."
        value={description}
        onChange={e => setDescription(e.target.value)} />
        {descError&&<p className="error">{descError}</p>}

        <label>Image (optional)</label>
        <input type="file" accept="image/*" onChange={fileHandle} />
        <button type="submit" >Add Item</button>
      </form>
      {savePopup&&<SavePopup onClose={closePopup}/>}
    </div>
  );
};
export default AddItem;
