// import { Link } from '@mui/material';
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import Productadd from './Productadd';
import AddCategory from './AddCategory';
import SideBar from '../Component/SideBar';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
const Dashboard = () => {
    const { path, url } = useRouteMatch()
    const token = "vZvNciqmBWGJi6nB"
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"))

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

    const filteredPosts = products.filter((p) => p.publisher === currentUserEmail)
    return (
        <div className='p-4'>
            <Row className='mt-4'>
                <Col md="3" className='h-100 bg-light rounded p-3 mt-3' style={{ position: "sticky", top: "0" }}>
                    <SideBar />
                </Col>
                <Col md="9" className='h-100'>
                    <Row className='container'>
                        <Switch>

                            <Route path={`${path}/manageproducts`}>
                                <Col md="12"><ManageProducts /></Col>
                            </Route>
                            <Route path={`${path}/managecategory`}>
                                <Col md="12"><ManageCategory /></Col>
                            </Route>
                            <Route path={`${path}/addcategory`}>
                                <Col md="12"><AddCategory /></Col>
                            </Route>
                            <Route path={`${path}/addproducts`}>
                                <Col md="12"><Productadd /></Col>
                            </Route>
                            <Route path={`${path}`}>

                                <h1 className='p-3'>Products</h1>
                                {
                                    filteredPosts.length === 0 && <h3 className='text-muted text-center'>No products published yet!</h3>
                                }{
                                    filteredPosts.map((item, index) => {
                                        return (
                                            <Col md="6" key={index} className='mt-3'>
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
                            </Route>
                        </Switch>

                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
