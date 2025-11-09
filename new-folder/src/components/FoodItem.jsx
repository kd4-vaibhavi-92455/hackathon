
function FoodItem(props) {
    return <div className="col">
        <div className="card m-2">
            <img src={`http://localhost:4000/images/${props.image}`} alt="Food Image" height={'180px'}/>
            <div className='card-body'>
            <h4 className='card-title'>{props.name}</h4>
            <p className='card-body'>{props.type} - {props.description}</p>
            <div>Rs. {props.price}/-</div>
            </div>
        </div>
    </div> 
}

export default FoodItem
