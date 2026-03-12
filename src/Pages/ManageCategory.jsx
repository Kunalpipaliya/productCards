import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const ManageCategory = () => {
    const token = "vZvNciqmBWGJi6nB"
    const [categories, setCategories] = useState([])

    const fetchCategories = () => {
        axios.get("https://generateapi.techsnack.online/api/categories", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setCategories(res.data.Data);
            })
            .catch((err) => {
                console.log(err);

            })
    }
    useEffect(() => {
        fetchCategories()
    }, [categories])
    const handleRemove = (id) => {
        axios.delete(` https://generateapi.techsnack.online/api/categories/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("category removed successfully!");

            })
            .catch((err) => {
                console.log(err);

            })
    }
    return (
        <div>
            <h1 className='p-3'>Manage Categories</h1>
            <table className='table table-bordered centered '>
                <tr>

                    <th className='bg-warning p-2'>Sr. NO.</th>
                    <th className='bg-warning p-2'>Categories</th>
                    <th className='bg-warning p-2'>Actions</th>
                </tr>
                {
                    categories.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button className="btn btn-primary me-2">Edit</button>
                                    <button className="btn btn-danger" onClick={()=>handleRemove(item._id)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default ManageCategory
