// import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item}) => {
    return (
        <li >
            
            <label 
                style={{ backgroundColor: 'green' }}
            >{item}</label>
            
        </li>
    )
}

export default LineItem