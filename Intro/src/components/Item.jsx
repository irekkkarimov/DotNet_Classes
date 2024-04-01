import {useNavigate} from "react-router-dom";


const Item = ({id, name}) => {
    const navigate = useNavigate()

    return (
        <>
            <div>
                <p>My name is {name}</p>
                <button onClick={() => navigate(`/item/${id}`)}>Go to my page</button>
            </div>
        </>
    )
}

export default Item