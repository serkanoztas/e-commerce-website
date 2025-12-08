import React, { useState } from 'react'
import ProductDetails from '../components/ProductDetails'
import SideBar from '../components/SideBar'

function Home() {

    const [selectedCategory, setSelectedCategory] = useState("");
   

    return (
        <div className='home-container'>
            <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <ProductDetails selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        </div>
    )
}

export default Home