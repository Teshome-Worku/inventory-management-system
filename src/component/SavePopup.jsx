const SavePopup=({onClose})=>{
    return(
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Item Added Successfully</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
export default SavePopup;