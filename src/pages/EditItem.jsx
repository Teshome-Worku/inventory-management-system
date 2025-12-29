import {useNavigator, useParams} from 'react-router-dom';
const EditItem=()=>{
    const navigate=useNavigator();
    const {id}=useParams();
    return(
        <div className="edit-item"></div>
    )
}
export default EditItem;