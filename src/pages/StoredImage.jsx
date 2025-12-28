import { useEffect ,useState} from "react"

const StoredImage = () => {
    const [img,setImg]=useState(null);
    useEffect(()=>{
        const storedImage=JSON.parse(localStorage.getItem("inventory"));
        const img=storedImage[0]?.image || null;
        setImg(img);
        
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
export default StoredImage