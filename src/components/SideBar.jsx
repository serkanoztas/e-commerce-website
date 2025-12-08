import React, { useEffect } from 'react'

function SideBar({ selectedCategory, setSelectedCategory }) {



    return (
        <div className='sidebar-main'>
            <div className='sidebar-checks'>
                <input type="radio" checked={selectedCategory === 'electronics'} name='option' onChange={(e) => setSelectedCategory('electronics')} />
                <label> Electronics </label>
            </div>
            <div className='sidebar-checks'>
                <input type="radio" checked={selectedCategory === 'jewelery'} name='option' onChange={(e) => setSelectedCategory('jewelery')} />
                <label> jewelery </label>
            </div>
            <div className='sidebar-checks'>
                <input type="radio" checked={selectedCategory === "men's clothing"} name='option' onChange={(e) => setSelectedCategory("men's clothing")} />
                <label> men's clothing </label>
            </div>
            <div className='sidebar-checks'>
                <input type="radio" checked={selectedCategory === "women's clothing"} name='option' onChange={(e) => setSelectedCategory("women's clothing")} />
                <label> women's clothing </label>
            </div>

        </div>
    )
}

export default SideBar