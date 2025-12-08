import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getProductsByCategory } from '../redux/slices/ProductSlice';

function ProductDetails({ selectedCategory, setSelectedCategory }) {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const [category, setCategory] = useState("");


    useEffect(() => {
        if (selectedCategory == "electronics") {
            setCategory("electronics");
        } else if (selectedCategory == "jewelery") {
            setCategory("jewelery");
        } else if (selectedCategory == "men's clothing") {
            setCategory("men's clothing");
        } else if (selectedCategory == "women's clothing") {
            setCategory("women's clothing");
        } else {
            dispatch(getAllProducts());
        }
    }, [selectedCategory, dispatch]);

    useEffect(() => {
        if (category) {
            dispatch(getProductsByCategory(category));
        }
    }, [category, dispatch]);

    return (
        <div className='product-details'>
            {
                products && products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductDetails