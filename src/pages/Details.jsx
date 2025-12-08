import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../redux/slices/ProductSlice';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { setBasketProducts } from '../redux/slices/BasketSlice';

function Details() {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const product = products.find((p) => p.id === parseInt(id));

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket = () => {
        const payload = {
            id: product.id,
            image: product.image,
            description: product.description,
            price: product.price,
            title: product.title,
            count: count
        }
        dispatch(setBasketProducts(payload));
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='Details-main'>
            <div className='flex-column'>
                <img src={product.image} />
            </div>
            <div className='Details-main-children'>
                <h2> {product.title} </h2>
                <p> {product.description} </p>
                <h1> {product.price}$ </h1>
                <div style={{ display: "flex", flexDirection: "row", width: "100px", justifyContent: "space-between" }}>
                    <CiCircleMinus onClick={decrement} size={30} />
                    <h2> {count} </h2>
                    <CiCirclePlus onClick={increment} size={30} />
                </div>
                <button onClick={addBasket}>Add To Basket</button>
            </div>
        </div>
    )
}

export default Details