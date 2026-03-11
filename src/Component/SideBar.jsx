import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom/cjs/react-router-dom'
const SideBar = () => {
    const { path, url } = useRouteMatch()

    return (
        <div style={{height:"70vh"}}>
            <nav className='d-flex flex-column gap-3'>
                <Link to={`${url}`} className="nav-link p-2"><strong>Products</strong></Link>
                <Link to={`${url}/addproducts`} className="nav-link p-2" ><strong>Add Products</strong></Link>
                <Link to={`${url}/addcategory`} className="nav-link p-2" ><strong>Add Category</strong></Link>
            </nav>
        </div>
    )
}

export default SideBar
