import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";

const Dashboard = () => {
    const token = "vZvNciqmBWGJi6nB"
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"))
    const [ini, setIni] = useState({
        productimg: "",
        productname: "",
        productprice: "",
        productdummyprice: "",
        productrating: "",
        publisher: currentUserEmail
    })
    const [pubslishform, setPublishForm] = useState(false)
    const [products, setProducts] = useState([])
    const fetchProducts = () => {
        axios.get("https://generateapi.techsnack.online/api/card", {
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
    }, [products])
    const handlePublish = (values, { resetForm }) => {
        console.log(values);

        axios.post("https://generateapi.techsnack.online/api/card", values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("product published successfully")
                setPublishForm(false)
                resetForm()
                setIni({
                    productimg: "",
                    productname: "",
                    productprice: "",
                    productdummyprice: "",
                    productrating: "",
                    publisher: currentUserEmail
                })
            })
            .catch((err) => {
                console.log(err);

            })
    }
    const filteredPosts = products.filter((p) => p.publisher === currentUserEmail)
    return (
        <div className='container'>
            {pubslishform === true ?
                <Formik
                    initialValues={ini}
                    onSubmit={handlePublish}
                >
                    <Form className='w-75 m-auto p-3 rounded shadow-lg mt-5'>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Product Image</label>
                            <Field name="productimg" className="form-control" placeholder="enter url of product image"></Field>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Product name</label>
                            <Field name="productname" className="form-control" placeholder="enter name of product"></Field>
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
                                            ini.productrating >= star
                                                ? "fa-solid fa-star text-warning"
                                                : "fa-regular fa-star text-warning"
                                        }
                                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                        onClick={() => setIni({ ...ini, productrating: star })}
                                    ></i>
                                ))}
                            </div>
                            {/* This hidden field ensures Formik picks up the value change */}
                            <Field name="productrating" type="number" className="d-none" value={ini.productrating} />
                        </div>
                        <button className="btn btn-primary" type='submit'>Publish</button>
                    </Form>
                </Formik>
                :
                <button className="btn btn-primary mt-3" onClick={() => setPublishForm(true)}>Add new Product</button>
            }
            <Row>

                {
                    filteredPosts.map((item, index) => {
                        return (
                            <Col md="4" key={index} className='mt-3'>
                                <div className="p-3 rounded shadow-sm bg-white border border-1" key={index}>

                                    <div style={{ width: "100%", height: "220px", borderRadius: "8px", overflow: "hidden" }}>
                                        <img
                                            src={item.productimg}
                                            alt={item.productname}
                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                    </div>

                                    <h2>{item.productname}</h2>
                                    <div className="d-flex gap-2">
                                        <p><i className="fa-solid fa-indian-rupee-sign"></i>{item.productprice}</p>
                                        <p className="text-decoration-line-through text-muted"><i className="fa-solid fa-indian-rupee-sign"></i>{item.productdummyprice}</p>
                                    </div>

                                    <p>Rating : {item.productrating}</p>
                                    <hr />
                                    <div className="d-flex align-items-center gap-3">

                                        <span className='bg-dark text-white d-flex justify-content-center align-items-center rounded-circle' style={{ width: "40px", height: "40px" }}>{currentUserEmail.at(0).toUpperCase()}</span><span className='text-muted'>{item.publisher}</span>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Dashboard
