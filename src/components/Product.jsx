import React from 'react'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

    const { id, description, image, price, title } = product;
    const description2 = description.slice(0, 50);

    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/details/${id}`);
    }

    return (
        <div className='product-main'>
            <img src={image} />
            <h2 className='title'> {title} </h2>
            <p> {description2}... </p>
            <h2 className='product-price'> {price} $ </h2>
            <button className='product-button' onClick={goToDetails}>Details</button>
        </div>
    )
}

export default Product