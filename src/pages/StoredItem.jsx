import { useEffect ,useState} from "react"
import '../component/storedItem.css'
const StoredItem = () => {
    const [img,setImg]=useState(null);
    useEffect(()=>{
        const StoredItem=JSON.parse(localStorage.getItem("inventory") || []);
        for(let i=0;i<=3;i++){
            const img=StoredItem[i]?.image || null;
            setImg(img);
        }     
    },[])
    return (
        <div className="stored">
            <p>Stored Image</p>
            <img src={img} alt="Stored"
             style={{
                width:"200px",
                height:"200px",
                border:"1px solid #ccc",
                borderRadius:"20px",
                marginTop:"10px"
                }} />
        </div>
    )
}
export default StoredItem;