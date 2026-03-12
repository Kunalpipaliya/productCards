import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const ManageProducts = () => {
    const token = "vZvNciqmBWGJi6nB"
    const [products, setProducts] = useState([])
    const fetchProducts = () => {
        axios.get("https://generateapi.techsnack.online/api/products", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setProducts(res.data.Data||[])
            })
            .catch((err) => {
                console.log(err);

            })
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const handleDelete = (id) => {
        axios.delete(`https://generateapi.techsnack.online/api/products/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("product removed successfully!")
                fetchProducts()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1 className="p-3">Manage Products</h1>
            <table className='table table-bordered'>
                <tr>
                    <th className='bg-warning p-2'>Sr. NO.</th>
                    <th className='bg-warning p-2'>Product Image</th>
                    <th className='bg-warning p-2'>Product Name</th>
                    <th className='bg-warning p-2'>Price</th>
                    <th className="bg-warning p-2">Rating</th>
                    <th className="bg-warning p-2">Actions</th>
                </tr>
                {
                    products.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>

                                    <img src={item.productimg} alt={item.productname} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                                </td>
                                <td>{item.productname}</td>
                                <td><i className="fa-solid fa-indian-rupee-sign"></i>{item.productprice}</td>
                                <td>{item.productrating}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2">Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}  >Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ManageProducts
