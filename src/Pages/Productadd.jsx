import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Productadd = () => {
    const token = "vZvNciqmBWGJi6nB"
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"))
    const initialValues = {
        productimg: "",
        productname: "",
        productcategory: "none",
        productprice: "",
        productdummyprice: "",
        productrating: 0, // Default to 0
        publisher: currentUserEmail
    }
    const [products, setProducts] = useState([])
    const fetchProducts = () => {
        axios.get("https://generateapi.techsnack.online/api/products", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data);
                setProducts(res.data.Data)
            })
            .catch((err) => {
                console.log(err);

            })
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const handlePublish = (values, { resetForm }) => {
        console.log(values);

        axios.post("https://generateapi.techsnack.online/api/products", values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("product published successfully")
                resetForm()
                fetchProducts()
                window.location.href = "/dashboard"
            })
            .catch((err) => {
                console.log(err);

            })
    }
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
    }, [])
    return (
        <div className='container'>
            <h1 className='p-3'>Add Product</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handlePublish}
            >
                {
                    ({ values, setFieldValue }) => (

                        <Form className=' m-auto p-3 rounded shadow-lg '>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Product Image</label>
                                <Field name="productimg" className="form-control" placeholder="enter url of product image"></Field>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Product name</label>
                                <Field name="productname" className="form-control" placeholder="enter name of product"></Field>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Product name</label>
                                <select className="form-control w-100" name="productcategory" as={Field} >
                                    <option value="none" className='w-100' disabled selected>none</option>
                                    {
                                        categories.map((item, index) => {
                                            return (
                                                <option key={index} value={item.category}>{item.category}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Product Price</label>
                                <Field name="productprice" type="number" className="form-control" placeholder="enter price of product"></Field>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="" className="form-label">Product Dummy Price</label>
                                <Field name="productdummyprice" type="number" className="form-control" placeholder="enter dummy price of product"></Field>
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Product Rating</label>
                                <div className="d-flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={
                                                values.productrating >= star
                                                    ? "fa-solid fa-star text-warning"
                                                    : "fa-regular fa-star text-warning"
                                            }
                                            style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                            onClick={() => setFieldValue("productrating", star)}
                                        ></i>
                                    ))}
                                </div>
                                {/* This hidden field ensures Formik picks up the value change */}
                                <Field name="productrating" type="number" className="d-none" value={values.productrating} />
                            </div>
                            <button className="btn btn-primary w-100" type='submit'>Publish</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Productadd
